import { headers } from "next/headers";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import NavBar from "./_components/nav-bar";
import PlaygroundCard from "./_components/playground-card";
import PixelThermometer from "./_components/pixelated-thermometer";
import type { GridItem } from "~/types/grid-item.types";
import type { ActualGrid, ExperimentalGrid } from "@prisma/client";

type GridData = ActualGrid | ExperimentalGrid;

export default async function Farm() {
  const session = await auth();
  const searchParams = new URLSearchParams(
    (await headers()).get("referer")?.split("?")[1],
  );
  const farmIdParam = searchParams.get("farmId");

  // Fetch farms owned by the user
  const farms = await db.farm.findMany({
    where: { ownerId: session?.user.id },
    orderBy: { name: "asc" },
  });

  const selectedFarmId =
    farms.find((farm) => farm.id === farmIdParam)?.id ?? farms[0]?.id;

  // Convert nullable properties to default values
  const transformGridData = (data: GridData[]): GridItem[] =>
    data.map((grid) => ({
      id: grid.id,
      cropType: grid.cropType ?? "",
      cropCount: grid.cropCount ?? 0,
      waterLevel: grid.waterLevel ?? 0,
      moistureLevel: grid.moistureLevel ?? 0,
      growthStage: grid.growthStage ?? "Seedling",
      row: grid.row,
      column: grid.column,
      farmId: grid.farmId,
      createdAt: grid.createdAt,
      updatedAt: grid.updateAt,
    }));

  // Fetch grid data
  const [actualGridDataRaw, experimentalGridDataRaw] = await Promise.all([
    db.actualGrid.findMany({
      where: { farmId: selectedFarmId },
      orderBy: { id: "asc" },
    }),
    db.experimentalGrid.findMany({
      where: { farmId: selectedFarmId },
      orderBy: { id: "asc" },
    }),
  ]);

  const actualGridData = transformGridData(actualGridDataRaw);
  const experimentalGridData = transformGridData(experimentalGridDataRaw);

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-[#f0fdf4]">
      <NavBar farms={farms} session={session} />

      {/* Playground Section */}
      <div className="flex flex-col items-center">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#166534]">
            Farm Playgrounds
          </h2>
          <p className="mx-auto max-w-2xl text-[#15803d]">
            Experiment with different variables and see how they affect your
            crop yield in real-time. Use our AI-powered predictions to optimize
            your farming strategy.
          </p>
        </div>

        <div className="flex items-center justify-center md:gap-x-[100px]">
          <div className="flex items-center justify-center">
            <PlaygroundCard
              title="Actual Playground"
              gridData={actualGridData ?? []}
            />
            <PixelThermometer gridData={actualGridData ?? []} />
          </div>
          <div className="flex items-center justify-center">
            <PlaygroundCard
              title="Experimental Playground"
              gridData={experimentalGridData ?? []}
            />
            <PixelThermometer gridData={experimentalGridData ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
