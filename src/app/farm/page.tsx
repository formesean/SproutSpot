import { auth } from "~/server/auth";
import { db } from "~/server/db";
import NavBar from "./_components/nav-bar";
import PlaygroundCard from "./_components/playground-card";
import { headers } from "next/headers";

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

  // Fetch grid data for the selected farm
  const gridData = await db.actualGrid.findMany({
    where: { farmId: selectedFarmId },
    orderBy: { id: "asc" },
  });

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

        <div className="flex justify-center md:gap-x-[100px]">
          <PlaygroundCard title="Actual Playground" gridData={gridData} />
          <PlaygroundCard title="Experimental Playground" gridData={gridData} />
        </div>
      </div>
    </div>
  );
}
