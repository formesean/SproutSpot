import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import CsvUploader from "./_components/csv-uploader";
import Link from "next/link";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";

export default async function ActualPlayground({
  searchParams,
}: {
  searchParams?: { farmId?: string };
}) {
  const session = await auth();

  // Fetch farms owned by the user
  const farms = await db.farm.findMany({
    where: { ownerId: session?.user.id },
    orderBy: { name: "asc" },
  });

  // Determine selected farm (default to the first available farm)
  const selectedFarmId = searchParams?.farmId ?? farms[0]?.id;

  // Fetch grid data for the selected farm
  const gridData = await db.actualGrid.findMany({
    where: { farmId: selectedFarmId },
    orderBy: { id: "asc" },
  });

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-[#f0fdf4]">
      <div className="absolute right-9 top-9 flex gap-2">
        {/* Farm Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#15803d]">
              🌾 {farms.find((f) => f.id === selectedFarmId)?.name ?? "Farm"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="border-[#15803d]">
            {farms.length > 0 ? (
              farms.map((farm, index) => (
                <DropdownMenuItem key={farm.id} asChild>
                  <Link href={`/actual-playground?farmId=${farm.id}`}>
                    {["🌿", "🌾", "🍀", "🌻", "🌴"][index % 5]} {farm.name}
                  </Link>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem className="text-gray-500">
                No farms available
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <CsvUploader />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Main Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#15803d]">☰ Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="border-[#15803d]">
            <DropdownMenuItem>
              <Link href={"/"}>🏠 Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Link
                href={
                  session
                    ? "/api/auth/signout?callbackUrl=/"
                    : `/api/auth/signin?callbackUrl=/actual-playground`
                }
              >
                {session && "❌ Quit"}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
          {["Actual Playground", "Experimental Playground"].map((title) => (
            <div key={title} className="m-5">
              <Card className="border-[#15803d]">
                <CardHeader>
                  <CardTitle className="font-semibold text-[#166534]">
                    {title}
                  </CardTitle>
                  <CardDescription className="text-[#15803d]">
                    {title === "Actual Playground"
                      ? "Digital Twin of your farm"
                      : "Where you can test on your farm"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="bg-[url('/grass.png')] bg-contain">
                    <div className="m-1 grid grid-cols-4 grid-rows-3">
                      <TooltipProvider>
                        {gridData.map((grid) => (
                          <Tooltip key={grid.id}>
                            <TooltipTrigger asChild>
                              <div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button className="m-1 border-[1px] border-black bg-[url('/soil.png')] bg-contain sm:h-16 sm:w-16 md:h-[102px] md:w-[102px]">
                                      {grid.cropType === "Corn" ? "🌽" : "🌱"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80 border-[#15803d]">
                                    <div className="grid gap-4">
                                      <div className="space-y-2">
                                        <h4 className="font-semibold leading-none text-[#166534]">
                                          Crop Details
                                        </h4>
                                        <p className="text-sm text-[#15803d]">
                                          See how your crops are doing.
                                        </p>
                                        <hr className="border-[#15803d]" />
                                      </div>
                                      <div className="grid gap-2">
                                        {[
                                          {
                                            label: "Crop Type",
                                            value: grid.cropType,
                                          },
                                          {
                                            label: "Crop Count",
                                            value: grid.cropCount,
                                          },
                                          {
                                            label: "Water Level",
                                            value: grid.waterLevel,
                                          },
                                          {
                                            label: "Moisture Level",
                                            value: grid.moistureLevel,
                                          },
                                        ].map(({ label, value }) => (
                                          <div
                                            key={label}
                                            className="m-1 grid grid-cols-3 items-center gap-4"
                                          >
                                            <Label className="font-medium text-[#166534]">
                                              {label}:
                                            </Label>
                                            <p className="text-sm font-light text-[#15803d]">
                                              {value}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#77b78a]">
                              <p>
                                🌱 Growth Stage:{" "}
                                {grid.growthStage || "Seedling"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </Card>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
