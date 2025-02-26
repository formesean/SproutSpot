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
import { Label } from "~/components/ui/label";
import { GrowthStage } from "~/types/playground.types";

type GridItem = {
  id: string;
  cropType: string;
  cropCount: number;
  waterLevel: number;
  moistureLevel: number;
  growthStage?: string;
};

export default function PlaygroundCard({
  title,
  gridData,
}: {
  title: "Actual Playground" | "Experimental Playground";
  gridData: GridItem[];
}) {
  const getEmojiSize = (growthStage: any) => {
    switch (growthStage) {
      case "Seedling":
        return "text-xs";
      case "Vegetative":
        return "text-sm";
      case "Budding":
        return "text-base";
      case "Flowering":
        return "text-lg";
      case "Fruiting":
        return "text-xl";
      case "Mature":
        return "text-2xl";
      case "Harvested":
        return "text-3xl";
      default:
        return "text-base";
    }
  };

  return (
    <div className="m-5">
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
                      <Button
                        className={`m-1 border-[1px] border-black bg-[url('/soil.png')] bg-contain sm:h-16 sm:w-16 md:h-[102px] md:w-[102px]`}
                      >
                        <span className={getEmojiSize(grid.growthStage)}>
                          {grid.cropType === "Corn" ? "🌽" : "🌱"}
                        </span>
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent className="rounded-md bg-white px-5 py-3 shadow-md">
                      <h1 className="text-base font-semibold text-[#166534]">
                        Crop Details
                      </h1>
                      <p className="text-sm text-[#15803d]">
                        See how your crops are doing.
                      </p>

                      <hr className="my-2 border-[#15803d]" />

                      <div className="space-y-1">
                        {[
                          { label: "Crop Type", value: grid.cropType },
                          { label: "Crop Count", value: grid.cropCount },
                          {
                            label: "Growth Stage",
                            value: grid.growthStage ?? "Seedling",
                          },
                          { label: "Water Level", value: grid.waterLevel },
                          {
                            label: "Moisture Level",
                            value: grid.moistureLevel,
                          },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex justify-between">
                            <span className="font-medium text-[#166534]">
                              {label}:
                            </span>
                            <span className="text-sm text-[#15803d]">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>

                    {/* <TooltipContent className="grid bg-white">
                      <h1 className="font-lg font-semibold leading-none text-[#166534]">
                        Crop Details
                      </h1>
                      <p className="text-sm text-[#15803d]">
                        See how your crops are doing.
                      </p>

                      <hr className="border-[#15803d]" />

                      <div className="grid gap-2">
                        {[
                          { label: "Crop Type", value: grid.cropType },
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
                    </TooltipContent> */}
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
