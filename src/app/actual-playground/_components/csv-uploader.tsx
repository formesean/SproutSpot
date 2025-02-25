"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "~/components/ui/button";
import {
  Sprout
} from "lucide-react"

interface CropData {
  croptype: string;
  cropcount: number;
  waterlvl: number;
  moisturelvl: number;
}

export default function CsvUploader() {
  const [error, setError] = useState<string | null>(null);
  const [cropData, setCropData] = useState<CropData[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("No file selected.");
      return;
    }

    setError(null);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const parsedData: CropData[] = (results.data as any[]).map((row) => ({
            croptype: row["croptype"],
            cropcount: parseInt(row["cropcount"]),
            waterlvl: parseInt(row["waterlvl"]),
            moisturelvl: parseInt(row["moisturelvl"]),
          }));

          console.log("Raw Row Data:", results.data);
          console.log("Parsed Data:", parsedData);
          console.log("Test:", cropData);

          setCropData(parsedData);
        }
      },
      error: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <div className="">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />

      <Button
        variant="outline"
        className="border-2 w-full bg-[#15803d] hover:bg-[#15803d]/80 hover:text-white text-white"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <Sprout className="mr-2 h-4 w-4" />
         Digitalize Farm
      </Button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
