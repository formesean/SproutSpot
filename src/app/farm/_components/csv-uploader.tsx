"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import type { ParseResult } from "papaparse";
import { Button } from "~/components/ui/button";
import { Sprout } from "lucide-react";
import type { CropData } from "~/types/crop.types";
import { api } from "~/trpc/react";

export default function CsvUploader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const importCSV = api.playground.importCSV.useMutation({
    onSuccess: () => {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    },
    onError: (err) => {
      setLoading(false);
      setError(err.message);
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    Papa.parse<CropData>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results: ParseResult<CropData>) => {
        if (results.errors.length) {
          setLoading(false);
          setError("Error parsing CSV file.");
          console.error("CSV Parsing Errors:", results.errors);
          return;
        }

        const parsedData = results.data.map((row, index) => ({
          id: crypto.randomUUID(),
          cropType: row.croptype ?? "",
          cropCount: Number(row.cropcount) ?? 0,
          waterLevel: Number(row.waterlvl) ?? 0,
          moistureLevel: Number(row.moisturelvl) ?? 0,
          growthStage: row.growthStage ?? "SEEDLING",
          row: Math.floor(index / 4),
          column: index % 4,
        }));

        if (!parsedData.length) {
          setLoading(false);
          setError("No valid data found in CSV.");
          return;
        }

        // Auto-import parsed data
        importCSV.mutate({ data: parsedData });
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />

      <Button
        variant="outline"
        className="w-full border-2 bg-[#15803d] text-white hover:bg-[#15803d]/80 hover:text-white sm:w-auto"
        onClick={() => document.getElementById("file-upload")?.click()}
        disabled={loading}
      >
        {loading ? (
          "Importing..."
        ) : (
          <>
            <Sprout className="mr-2 h-4 w-4" /> Create New Farm
          </>
        )}
      </Button>

      {error && <p className="text-sm text-red-500 sm:text-base">{error}</p>}
    </div>
  );
}
