"use client";

import { useState } from "react";
import Papa from "papaparse";
import type { ParseResult } from "papaparse";
import { Button } from "~/components/ui/button";
import { Sprout } from "lucide-react";

interface CropData {
  croptype: string;
  cropcount: number;
  waterlvl: number;
  moisturelvl: number;
}

export default function CsvUploader() {
  const [error, setError] = useState<string | null>(null);
  const [cropData, setCropData] = useState<CropData[]>([]);

  console.log(cropData);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("No file selected.");
      return;
    }

    setError(null);
    Papa.parse<CropData>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results: ParseResult<CropData>) => {
        if (results.errors.length) {
          setError("Error parsing CSV file.");
          console.error("CSV Parsing Errors:", results.errors);
          return;
        }

        const parsedData: CropData[] = results.data.map((row) => ({
          croptype: row.croptype || "",
          cropcount: Number(row.cropcount) || 0,
          waterlvl: Number(row.waterlvl) || 0,
          moisturelvl: Number(row.moisturelvl) || 0,
        }));

        console.log("Raw Row Data:", results.data);
        console.log("Parsed Data:", parsedData);

        setCropData(parsedData);
      },
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />

      <Button
        variant="outline"
        className="w-full border-2 bg-[#15803d] text-white hover:bg-[#15803d]/80 hover:text-white"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <Sprout className="mr-2 h-4 w-4" />
        Digitalize Farm
      </Button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
