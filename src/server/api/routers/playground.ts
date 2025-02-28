import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

import { GrowthStage } from "@prisma/client";

export const playgroundRouter = createTRPCRouter({
  // Import CSV and push to database
  importCSV: protectedProcedure
    .input(
      z.object({
        farmName: z.string().optional(),
        data: z.array(
          z.object({
            id: z.string(),
            cropType: z.string(),
            cropCount: z.number(),
            waterLevel: z.number(),
            moistureLevel: z.number(),
            growthStage: z.string(),
            row: z.number(),
            column: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const ownerId = ctx.session?.user?.id;
      if (!ownerId) {
        throw new Error(
          "Unauthorized: User must be logged in to create a farm.",
        );
      }

      // Fetch existing farm names
      const existingFarms = await db.farm.findMany({
        where: { ownerId },
        select: { name: true },
      });

      // Extract numbers from farm names
      const farmNumbers = existingFarms
        .map((farm) => {
          if (!farm.name) return null;
          const match = /^Farm (\d+)$/.exec(farm.name);
          return match?.[1] ? parseInt(match[1], 10) : null;
        })
        .filter((num): num is number => num !== null)
        .sort((a, b) => a - b);

      // Determine next farm number
      let nextFarmNumber = 1;
      for (const num of farmNumbers) {
        if (num === nextFarmNumber) {
          nextFarmNumber++;
        } else {
          break;
        }
      }

      const newFarmName = `Farm ${nextFarmNumber}`;

      const newFarm = await db.farm.create({
        data: { name: newFarmName, owner: { connect: { id: ownerId } } },
      });

      const farmId = newFarm.id;

      function mapGrowthStage(stage: string): GrowthStage {
        const enumValue = Object.values(GrowthStage).find(
          (s) => s.toLowerCase() === stage.toLowerCase(),
        );
        if (!enumValue) {
          throw new Error(`Invalid growth stage: ${stage}`);
        }
        return enumValue as GrowthStage;
      }

      await db.actualGrid.createMany({
        data: input.data.map((cell) => ({
          ...cell,
          farmId,
          growthStage: mapGrowthStage(cell.growthStage),
        })),
      });

      await db.experimentalGrid.createMany({
        data: input.data.map((cell) => ({
          ...cell,
          farmId,
          growthStage: mapGrowthStage(cell.growthStage),
        })),
      });

      return { success: true, farmId, farmName: newFarmName };
    }),

  // Fetch all farms owned by the current user
  getUserFarms: protectedProcedure.query(async ({ ctx }) => {
    const ownerId = ctx.session?.user?.id;
    if (!ownerId) {
      throw new Error("Unauthorized: User must be logged in to fetch farms.");
    }

    return await db.farm.findMany({
      where: { ownerId },
      select: { id: true, name: true },
    });
  }),

  // Fetch actual playground data
  getActualGrid: publicProcedure
    .input(z.object({ farmId: z.string() }))
    .query(async ({ input }) => {
      return await db.actualGrid.findMany({
        where: { farmId: input.farmId },
      });
    }),

  // Fetch experimental playground data
  getExperimentalGrid: publicProcedure
    .input(z.object({ farmId: z.string() }))
    .query(async ({ input }) => {
      return await db.experimentalGrid.findMany({
        where: { farmId: input.farmId },
      });
    }),

  // Update an experimental grid cell (user applies changes)
  updateExperimentalCell: publicProcedure
    .input(
      z.object({
        cellId: z.string(), // Use this in `where`
        cropCount: z.number().optional(),
        waterLevel: z.number().optional(),
        moistureLevel: z.number().optional(),
        growthStage: z
          .enum([
            "Seedling",
            "Vegetative",
            "Budding",
            "Flowering",
            "Fruiting",
            "Mature",
            "Harvested",
          ])
          .optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.experimentalGrid.update({
        where: { id: input.cellId },
        data: {
          cropCount: input.cropCount,
          waterLevel: input.waterLevel,
          moistureLevel: input.moistureLevel,
          growthStage: input.growthStage,
        },
      });
    }),

  // Delete a farm
  deleteFarm: protectedProcedure
    .input(z.object({ farmId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const ownerId = ctx.session?.user?.id;
      if (!ownerId) {
        throw new Error(
          "Unauthorized: User must be logged in to delete a farm.",
        );
      }

      // Ensure the farm belongs to the user
      const farm = await db.farm.findFirst({
        where: { id: input.farmId, ownerId },
      });
      if (!farm) {
        throw new Error(
          "Farm not found or you do not have permission to delete it.",
        );
      }

      // Delete associated grid data first
      await db.actualGrid.deleteMany({ where: { farmId: input.farmId } });
      await db.experimentalGrid.deleteMany({ where: { farmId: input.farmId } });

      // Delete the farm
      await db.farm.delete({ where: { id: input.farmId } });

      return { success: true, message: "Farm deleted successfully." };
    }),

  // Reset experimental grid to match actual grid
  resetExperimentalGrid: protectedProcedure
    .input(z.object({ farmId: z.string() }))
    .mutation(async ({ input }) => {
      // Delete existing experimental grid data
      await db.experimentalGrid.deleteMany({ where: { farmId: input.farmId } });

      // Copy actual grid data to experimental grid
      const actualGridData = await db.actualGrid.findMany({
        where: { farmId: input.farmId },
      });
      await db.experimentalGrid.createMany({
        data: actualGridData.map(({ id, farmId, ...rest }) => ({
          farmId,
          ...rest,
        })),
      });

      return {
        success: true,
        message: "Experimental grid reset successfully.",
      };
    }),
});
