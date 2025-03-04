"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Sprout, Shield, Cloud, RotateCcw } from "lucide-react";
import { Dock, DockIcon } from "~/components/magicui/dock";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

interface DockbarProps {
  farmId: string;
}

const icons = [
  { id: "water", Icon: Droplets, label: "Water" },
  { id: "fertilizer", Icon: Sprout, label: "Fertilizer" },
  { id: "pesticide", Icon: Shield, label: "Pesticide" },
  { id: "weather", Icon: Cloud, label: "Weather" },
];

export function Dockbar({ farmId }: DockbarProps) {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const resetMutation = api.playground.resetExperimentalGrid.useMutation();

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

  const handleReset = async () => {
    if (!farmId) {
      console.error("Error: farmId is undefined!");
      return;
    }

    try {
      await resetMutation.mutateAsync({ farmId });
      router.refresh();
    } catch (error) {
      console.error("Failed to reset experimental grid:", error);
    }
    setIsDialogOpen(false);
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

      {/* Reset Icon (Not a selectable tool) */}
      <motion.div
        className="pointer-events-auto cursor-none"
        whileHover={{ rotate: -360 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setIsDialogOpen(true)}
      >
        <DockIcon className="pointer-events-auto relative cursor-none">
          <RotateCcw className="size-full text-[#15803d]" />
        </DockIcon>
      </motion.div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="pointer-events-auto z-40 cursor-none">
          <DialogHeader>
            <DialogTitle>Reset Experimental Grid</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to reset the experimental grid? This action
            cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="pointer-events-auto cursor-none"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={resetMutation.isPending}
              className="pointer-events-auto cursor-none"
            >
              {resetMutation.isPending ? "Resetting..." : "Confirm Reset"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dock>
  );
}
