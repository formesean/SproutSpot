import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "~/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { GridItem } from "~/types/grid-item.types";
import { Button } from "~/components/ui/button";
import CropInputs from "./crop-input";
import PixelHeatMap from "./pixelated-heat-map";

interface CropDetailsProps {
  grid: GridItem;
}

const CropDetails = ({ grid }: CropDetailsProps) => {
  if (!grid.cropType) {
    return (
      <div>
        <h1 className="text-base font-semibold text-[#166534]">Empty farm</h1>
        <p className="text-sm text-[#15803d]">Click the🌾Farm button.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-base font-semibold text-[#166534]">Crop Details</h1>
      <p className="text-sm text-[#15803d]">See how your crops are doing.</p>
      <hr className="my-2 border-[#15803d]" />
      <div className="space-y-1">
        {[
          { label: "Crop Type", value: grid.cropType },
          { label: "Crop Count", value: grid.cropCount },
          { label: "Growth Stage", value: grid.growthStage ?? "Seedling" },
          { label: "Water Level", value: grid.waterLevel },
          { label: "Moisture Level", value: grid.moistureLevel },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between">
            <span className="font-medium text-[#166534]">{label}:</span>
            <span className="text-sm text-[#15803d]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface GridCellProps {
  grid: GridItem;
  isExperimental: boolean;
  getEmojiSize: (growthStage?: string) => string;
}

const GridCell = ({ grid, isExperimental, getEmojiSize }: GridCellProps) => {
  const buttonContent = (
    <Button className="pointer-events-auto m-1 cursor-none border-[1px] border-black bg-[url('/soil.png')] bg-contain sm:h-16 sm:w-16 md:h-[102px] md:w-[102px]">
      <span className={getEmojiSize(grid.growthStage)}>
        {grid.cropType === "rice"
          ? "🌾"
          : grid.cropType === "corn"
            ? "🌽"
            : grid.cropType === "sugarcane"
              ? "🎍"
              : ""}
      </span>
    </Button>
  );

  if (isExperimental && grid.cropType) {
    return (
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div>
            <Popover>
              <PopoverTrigger asChild>{buttonContent}</PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="center"
                className="max-h-[80vh] w-[20rem] overflow-y-auto rounded-md bg-white px-5 py-3 shadow-md"
              >
                <CropInputs grid={grid} />
              </PopoverContent>
            </Popover>
          </div>
        </TooltipTrigger>
        <TooltipContent className="z-0 rounded-md bg-white px-5 py-3 shadow-md">
          <CropDetails grid={grid} />
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
      <TooltipContent className="z-0 rounded-md bg-white px-5 py-3 shadow-md">
        <CropDetails grid={grid} />
      </TooltipContent>
    </Tooltip>
  );
};

interface PlaygroundCardProps {
  title: "Actual Playground" | "Experimental Playground";
  gridData: GridItem[];
}

export default function PlaygroundCard({
  title,
  gridData = [],
}: PlaygroundCardProps) {
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

  const defaultGrid = Array.from({ length: 12 }).map((_, index) => ({
    id: `empty-${index}`,
    cropType: "",
    cropCount: 0,
    waterLevel: 0,
    moistureLevel: 0,
    growthStage: "Seedling",
    row: Math.floor(index / 4),
    column: index % 4,
    farmId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return (
    <div className="m-5">
      <Card className="border-[#15803d]">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className="font-semibold text-[#166534]">
              {title}
            </CardTitle>
            <CardDescription className="text-[#15803d]">
              {title === "Actual Playground"
                ? "Digital Twin of your farm"
                : "Where you can test on your farm"}
            </CardDescription>
          </div>
          <PixelHeatMap
            gridData={gridData.length > 0 ? gridData : defaultGrid}
          />
        </CardHeader>
        <CardContent>
          <Card className="bg-[url('/grass.png')] bg-contain">
            <TooltipProvider>
              <div className="z-0 m-1 grid grid-cols-4 grid-rows-3">
                {(gridData.length > 0 ? gridData : defaultGrid).map((grid) => (
                  <GridCell
                    key={grid.id}
                    grid={grid}
                    isExperimental={title === "Experimental Playground"}
                    getEmojiSize={getEmojiSize}
                  />
                ))}
              </div>
            </TooltipProvider>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
