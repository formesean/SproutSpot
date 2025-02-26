"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AIComponent() {
  const [geminiRes, setGeminiRes] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY as string,
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Crop Details
                      Crop Type: rice
                      Crop Count: 54
                      Water Level: 1
                      Moisture Level: 43

                      based on the crop details, suggest how the crops are doing.
                      `;

      const result = (await model.generateContent(prompt)).response.text();

      setGeminiRes(result);
    } catch (error) {
      console.error("Error generating content:", error);
      setGeminiRes("Failed to generate response.");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <Button onClick={handleClick}>Test AI</Button>
      <p>{geminiRes}</p>
    </div>
  );
}
