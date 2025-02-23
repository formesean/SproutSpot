"use client";

import { useState } from "react";
import Papa from 'papaparse';
import { Button } from "~/components/ui/button";

interface CropData {
  croptype: string;
  cropcount: number;
  waterlvl: number;
  moisturelvl: number;
}

export default function CsvUploader() {
  const [error, setError] = useState<string | null>(null);

  // State to store parsed CSV data
  const [cropTypes, setCropTypes] = useState<string[]>([]);
  const [cropCounts, setCropCounts] = useState<number[]>([]);
  const [waterLevels, setWaterLevels] = useState<number[]>([]);
  const [moistureLevels, setMoistureLevels] = useState<number[]>([]);

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
          // Typecast and store data in separate arrays
          const parsedData: CropData[] = (results.data as any[]).map((row) => ({
            croptype: row["croptype"],
            cropcount: parseInt(row["cropcount"]),
            waterlvl: parseInt(row["waterlvl"]),
            moisturelvl: parseInt(row["moisturelvl"]),
          }));

          console.log("Raw Row Data:", results.data);
          console.log("Parsed Data:", parsedData);
          
          setCropTypes(parsedData.map((crop) => crop["croptype"]));
          setCropCounts(parsedData.map((crop) => crop["cropcount"]));
          setWaterLevels(parsedData.map((crop) => crop["waterlvl"]));
          setMoistureLevels(parsedData.map((crop) => crop["moisturelvl"]));
        }
      },
      error: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />

      <Button
        variant="outline"
        className="p-2 border-2"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        📂 Digitalize Farm
      </Button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
