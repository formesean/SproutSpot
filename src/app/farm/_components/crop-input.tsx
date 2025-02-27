"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import type { GridItem } from "~/types/grid-item.types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface CropInputsProps {
  grid: GridItem;
}

export default function CropInputs({ grid }: CropInputsProps) {
  const router = useRouter();

  const [water, setWater] = useState(0);
  const [fertilizer, setFertilizer] = useState(0);
  const [pesticide, setPesticide] = useState(0);
  const [weather, setWeather] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggested, setIsSuggested] = useState(false);

  const { mutateAsync: updateCell } =
    api.playground.updateExperimentalCell.useMutation();

  const handleExperiment = async () => {
    setIsLoading(true);
    setIsSuggested(false);

    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
      );
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Crop Details:
                      - Crop Type: ${grid.cropType}
                      - Crop Count: ${grid.cropCount}
                      - Current Water Level: ${grid.waterLevel} L
                      - Moisture Level: ${grid.moistureLevel}%
                      - Growth Stage: ${grid.growthStage}

                      Input Parameters:
                      - Water Applied: ${water} L
                      - Fertilizer Applied: ${fertilizer}
                      - Pesticide Applied: ${pesticide}
                      - Weather Condition: ${weather}

                      ### Instructions:
                      Analyze the given crop details and input parameters to provide the following:

                      Suggestions:
                      Water to apply: {optimal amount in liters}
                      Fertilizer to apply: {optimal amount in grams}
                      Pesticide to apply: {optimal amount in milliliters per liter of water}

                      Predictions:
                      Predict the crop’s condition in the next few days, including any risks. (Concise, One Sentence)

                      Don't add any font stylings, like bold or italic, remove any symbols like dashes and underscores`;

      const result = (await model.generateContent(prompt)).response.text();

      const predictionMatch = /Predictions:\n(.+)/.exec(result);
      const message = predictionMatch?.[1]?.trim() ?? "Prediction not found.";

      const waterMatch = /Water to apply:\s*(\d+\.?\d*)/.exec(result);
      const fertilizerMatch = /Fertilizer to apply:\s*(\d+\.?\d*)/.exec(result);
      const pesticideMatch = /Pesticide to apply:\s*(\d+\.?\d*)/.exec(result);

      const suggestedWater = waterMatch?.[1]
        ? parseFloat(waterMatch[1])
        : water;
      const suggestedFertilizer = fertilizerMatch?.[1]
        ? parseFloat(fertilizerMatch[1])
        : fertilizer;
      const suggestedPesticide = pesticideMatch?.[1]
        ? parseFloat(pesticideMatch[1])
        : pesticide;

      // Determine new crop data based on input
      const newWaterLevel = water < 30 ? 1 : suggestedWater <= 70 ? 2 : 3;
      const newMoistureLevel = Math.min(10, Math.floor(water / 10));

      // Update local UI
      setWater(suggestedWater);
      setFertilizer(suggestedFertilizer);
      setPesticide(suggestedPesticide);
      setIsSuggested(true);

      // 🔥 API Call to Update Database
      await updateCell({
        cellId: grid.id,
        waterLevel: newWaterLevel,
        moistureLevel: newMoistureLevel,
        cropCount: grid.cropCount,
      });

      router.refresh();

      toast("Prediction", {
        description: message,
        classNames: {
          toast: "!border-[#15803d] !py-0",
          title: "!text-lg !text-[#166534] !font-semibold !pt-2",
          description: "!text-[#15803d] !text-justify !pb-3",
        },
        duration: 15000,
      });
    } catch (error) {
      console.error("Error:", error);
      toast("Experiment Failed", {
        description: "Something went wrong!",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-10 space-y-3">
      {/* Water Input */}
      <div className="flex items-center justify-between space-x-3">
        <Label className="w-[4rem] text-[#166534]">Water</Label>
        <Slider
          value={[water]}
          max={100}
          step={1}
          className={`flex-1 ${isSuggested ? "bg-green-200" : ""}`}
          onValueChange={(val) => {
            setWater(val[0] ?? water);
            setIsSuggested(false);
          }}
        />
        <span className="w-[80px] text-right text-sm text-[#166534]">
          {water} L{" "}
          {isSuggested && <span className="text-green-600">(Suggested)</span>}
        </span>
      </div>

      {/* Fertilizer Input */}
      <div className="flex items-center justify-between space-x-3">
        <Label className="w-[4rem] text-[#166534]">Fertilizer</Label>
        <Slider
          value={[fertilizer]}
          max={100}
          step={1}
          className={`flex-1 ${isSuggested ? "bg-green-200" : ""}`}
          onValueChange={(val) => {
            setFertilizer(val[0] ?? fertilizer);
            setIsSuggested(false);
          }}
        />
        <span className="w-[80px] text-right text-sm text-[#166534]">
          {fertilizer} g{" "}
          {isSuggested && <span className="text-green-600">(Suggested)</span>}
        </span>
      </div>

      {/* Pesticide Input */}
      <div className="flex items-center justify-between space-x-3">
        <Label className="w-[4rem] text-[#166534]">Pesticide</Label>
        <Slider
          value={[pesticide]}
          max={100}
          step={1}
          className={`flex-1 ${isSuggested ? "bg-green-200" : ""}`}
          onValueChange={(val) => {
            setPesticide(val[0] ?? pesticide);
            setIsSuggested(false);
          }}
        />
        <span className="w-[80px] text-right text-sm text-[#166534]">
          {pesticide} mL{" "}
          {isSuggested && <span className="text-green-600">(Suggested)</span>}
        </span>
      </div>

      {/* Weather Dropdown */}
      <div className="flex items-center justify-between space-x-3">
        <Label className="w-[4rem] text-[#166534]">Weather</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 border-[#166534] text-[#166534]"
            >
              {weather ?? "Choose Weather"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuGroup>
              {["Sunny", "Rainy", "Windy", "Stormy", "Cloudy"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setWeather(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Save Button */}
      <Button
        className="w-full bg-[#15803d] hover:bg-[#166534] disabled:opacity-50"
        onClick={handleExperiment}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <p>Experimenting...</p>
          </>
        ) : (
          "Experiment"
        )}
      </Button>
    </div>
  );
}
