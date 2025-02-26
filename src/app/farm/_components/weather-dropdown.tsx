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

export default function WeatherDropdown() {
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selectedWeather ? selectedWeather : "Choose Weather"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {["Sunny", "Rainy", "Windy", "Stormy", "Cloudy"].map((weather) => (
            <DropdownMenuItem
              key={weather}
              onClick={() => setSelectedWeather(weather)}
            >
              <span>{weather}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
