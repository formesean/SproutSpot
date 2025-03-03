"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Sprout, Shield, Cloud } from "lucide-react";
import { Dock, DockIcon } from "~/components/magicui/dock";

const icons = [
  { id: "water", Icon: Droplets, label: "Water" },
  { id: "fertilizer", Icon: Sprout, label: "Fertilizer" },
  { id: "pesticide", Icon: Shield, label: "Pesticide" },
  { id: "weather", Icon: Cloud, label: "Weather" },
];

export function Dockbar() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTool = sessionStorage.getItem("selectedTool");
      setSelectedTool(storedTool);
    }
  }, []);

  const handleToolSelect = (toolId: string) => {
    const newTool = selectedTool === toolId ? null : toolId;
    setSelectedTool(newTool);

    if (typeof window !== "undefined") {
      if (newTool) {
        sessionStorage.setItem("selectedTool", newTool);
      } else {
        sessionStorage.removeItem("selectedTool");
      }
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <Dock
      className="dock-container pointer-events-auto fixed bottom-0 left-1/2 mb-7 -translate-x-1/2 transform cursor-none px-7 py-10 shadow-2xl max-sm:px-3 max-sm:py-9"
      direction="middle"
    >
      {icons.map(({ id, Icon, label }) => (
        <motion.div
          key={id}
          className="pointer-events-auto cursor-none"
          whileTap={{ scale: 1.2 }}
          animate={{ scale: selectedTool === id ? 1.3 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          onClick={() => handleToolSelect(id)}
        >
          <DockIcon className="pointer-events-auto relative cursor-none">
            <Icon
              className={`size-full text-[#15803d] transition-all max-sm:siDockIcon${
                selectedTool === id ? "text-[#0f4a1e]" : ""
              }`}
            />
            {selectedTool === id && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-green-800 px-2 py-1 text-xs text-white">
                {label}
              </span>
            )}
          </DockIcon>
        </motion.div>
      ))}
    </Dock>
  );
}
