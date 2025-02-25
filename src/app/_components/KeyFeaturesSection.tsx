"use client";

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Leaf, BarChart, Zap } from "lucide-react";

export default function KeyFeaturesSection() {
  const [isClicked, setIsClicked] = useState<boolean[]>([false, false, false]);

  const handleCardClick = (index: number) => {
    const newClickedState = [...isClicked];
    newClickedState[index] = !newClickedState[index];
    setIsClicked(newClickedState);
  };

  return (
    <>
      <div className="mx-auto mb-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-green-800">Key Features</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature 1*/}
        <div
          className={`transform rounded-lg p-4 transition-all duration-300 hover:scale-105 ${
            isClicked[0]
              ? "h-auto border-2 border-green-500"
              : "h-64 border-transparent"
          }`}
          onClick={() => handleCardClick(0)}
        >
          <Card className="h-full rounded-lg">
            <CardHeader>
              <CardTitle className="flex flex-col items-center">
                <BarChart className="mb-4 h-8 w-8 text-green-600" />
                <h3 className="mb-4 text-xl text-green-800">
                  AI-Powered Crop Prediction
                </h3>
              </CardTitle>
              <CardDescription>
                <p className="mb-4 text-green-700">
                  Forecast plant growth, yield, and health using machine
                  learning algorithms.
                </p>
                {isClicked[0] && (
                  <p className="text-green-600">
                    Our AI models analyze historical data, weather patterns, and
                    soil condition to provide accurate predictions for your
                    crops. This helps you make informed decisions about
                    planting, harvesting, and resource allocation.
                  </p>
                )}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Feature 2*/}
        <div
          className={`transform rounded-lg p-4 transition-all duration-300 hover:scale-105 ${
            isClicked[1]
              ? "h-auto border-2 border-green-500"
              : "h-64 border-transparent"
          }`}
          onClick={() => handleCardClick(1)}
        >
          <Card className="h-full rounded-lg">
            <CardHeader>
              <CardTitle className="flex flex-col items-center">
                <Zap className="mb-4 h-8 w-8 text-green-600" />
                <h3 className="mb-4 text-xl text-green-800">
                  Interactive Digital Twin Farm
                </h3>
              </CardTitle>
              <CardDescription>
                <p className="mb-4 text-green-700">
                  Create a visual representation of your farm for real-time
                  monitoring and simulations.
                </p>
                {isClicked[1] && (
                  <p className="text-green-600">
                    The digital twin technology allows you to create a virtual
                    replica of your farm. This interactive model helps you
                    visualize different scenarios, test strategies, and optimize
                    your farm layout for maximum efficiency.
                  </p>
                )}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Feature 3*/}
        <div
          className={`transform rounded-lg p-4 transition-all duration-300 hover:scale-105 ${
            isClicked[2]
              ? "h-auto border-2 border-green-500"
              : "h-64 border-transparent"
          }`}
          onClick={() => handleCardClick(2)}
        >
          <Card className="h-full rounded-lg">
            <CardHeader>
              <CardTitle className="flex flex-col items-center">
                <Leaf className="mb-4 h-8 w-8 text-green-600" />
                <h3 className="mb-4 text-xl text-green-800">
                  AI-Based Tips and Suggestions
                </h3>
              </CardTitle>
              <CardDescription>
                <p className="mb-4 text-green-700">
                  Receive data-driven recommendations to optimize farming
                  conditions and improve crop yields.
                </p>
                {isClicked[2] && (
                  <p className="text-green-600">
                    Our AI constantly analyzes your farm's data and provides
                    personalized suggestions for improving crop health, reducing
                    resource waste, and increasing overall farm productivity.
                  </p>
                )}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}
