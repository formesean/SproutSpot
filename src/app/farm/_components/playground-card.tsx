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
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#77b78a]">
                      <p>🌱 Growth Stage: {grid.growthStage || "Seedling"}</p>
                    </TooltipContent>
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
