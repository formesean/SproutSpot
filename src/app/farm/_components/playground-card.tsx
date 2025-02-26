import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { GridItem } from "~/types/grid-item.types";
import { Button } from "../../../components/ui/button";
import CropInputs from "./crop-input";

export default function PlaygroundCard({
  title,
  gridData,
}: {
  title: "Actual Playground" | "Experimental Playground";
  gridData: GridItem[];
}) {
  const getEmojiSize = (growthStage: string | undefined) => {
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
                  <Tooltip key={grid.id} delayDuration={200}>
                    <TooltipTrigger asChild>
                      {title === "Experimental Playground" ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              className={`m-1 border-[1px] border-black bg-[url('/soil.png')] bg-contain sm:h-16 sm:w-16 md:h-[102px] md:w-[102px]`}
                            >
                              <span className={getEmojiSize(grid.growthStage)}>
                                {grid.cropType === "Corn" ? "🌽" : "🌱"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            side="bottom"
                            align="center"
                            className="max-h-[80vh] w-80 overflow-y-auto rounded-md bg-white px-5 py-3 shadow-md"
                          >
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
                                  className="flex justify-between"
                                >
                                  <span className="font-medium text-[#166534]">
                                    {label}:
                                  </span>
                                  <span className="text-sm text-[#15803d]">
                                    {value}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <hr className="my-2 border-[#15803d]" />

                            <div className="space-y-2">
                              <CropInputs />
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Button
                          className={`m-1 border-[1px] border-black bg-[url('/soil.png')] bg-contain sm:h-16 sm:w-16 md:h-[102px] md:w-[102px]`}
                        >
                          <span className={getEmojiSize(grid.growthStage)}>
                            {grid.cropType === "Corn" ? "🌽" : "🌱"}
                          </span>
                        </Button>
                      )}
                    </TooltipTrigger>

                    {/* Tooltip is always shown for both playgrounds */}
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
                  </Tooltip>
                ))}
              </TooltipProvider>

              {/* <TooltipProvider>
                {gridData.map((grid) => (
                  <Tooltip key={grid.id} delayDuration={200}>
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
                  </Tooltip>
                ))}
              </TooltipProvider> */}
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
