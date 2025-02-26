"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function CropInputs() {
  const [water, setWater] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [pesticide, setPesticide] = useState("");
  const [weather, setWeather] = useState<string | null>(null);

  const handleSave = () => {
    console.log("Water (L):", water);
    console.log("Fertilizer:", fertilizer);
    console.log("Pesticide:", pesticide);
    console.log("Weather:", weather);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor="waterInput" className="w-24 text-[#166534]">
          Water (L)
        </Label>
        <Input
          id="waterInput"
          placeholder="Enter water (L)"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="fertilizerInput" className="w-24 text-[#166534]">
          Fertilizer
        </Label>
        <Input
          id="fertilizerInput"
          placeholder="Enter fertilizer amount"
          value={fertilizer}
          onChange={(e) => setFertilizer(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="pesticideInput" className="w-24 text-[#166534]">
          Pesticide
        </Label>
        <Input
          id="pesticideInput"
          placeholder="Enter pesticide amount"
          value={pesticide}
          onChange={(e) => setPesticide(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="weatherInput" className="w-24 text-[#166534]">
          Weather
        </Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {weather ? weather : "Choose Weather"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {["Sunny", "Rainy", "Windy", "Stormy", "Cloudy"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setWeather(option)}
                >
                  <span>{option}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button variant="outline" className="mt-3 w-full" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}
