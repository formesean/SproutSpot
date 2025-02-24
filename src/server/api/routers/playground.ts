import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

// Schema for grid cell data
const GridCellSchema = z.object({
  id: z.string(),
  cropType: z.string(),
  cropCount: z.number(),
  waterLevel: z.number(),
  moistureLevel: z.number(),
  growthStage: z.enum([
    "Seedling",
    "Vegetative",
    "Budding",
    "Flowering",
    "Fruiting",
    "Mature",
    "Harvested",
  ]),
  row: z.number(),
  column: z.number(),
});

export const playgroundRouter = createTRPCRouter({
  // Import CSV and push to database
  importCSV: publicProcedure
    .input(
      z.object({
        farmId: z.string(),
        data: z.array(GridCellSchema),
      }),
    )
    .mutation(async ({ input }) => {
      const { farmId, data } = input;

      // Store actual grid data & duplicate for experimental grid
      await db.actualGrid.createMany({
        data: data.map((cell) => ({
          ...cell,
          farmId,
        })),
      });

      await db.experimenalGrid.createMany({
        data: data.map((cell) => ({
          ...cell,
          farmId,
        })),
      });

      return { success: true };
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
      return await db.experimenalGrid.findMany({
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
      return await db.experimenalGrid.update({
        where: { id: input.cellId },
        data: { ...input },
      });
    }),
});
