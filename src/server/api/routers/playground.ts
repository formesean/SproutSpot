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
          const match = farm.name.match(/^Farm (\d+)$/);
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
        cellId: z.string(),
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
        data: { ...input },
      });
    }),
});
