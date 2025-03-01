"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "~/lib/utils";

interface DroppableProps extends PropsWithChildren {
  id: string;
  className?: string;
  onDrop?: (id: string) => void; // Add a custom onDrop handler
}

const Droppable: React.FC<DroppableProps> = ({
  id,
  className,
  children,
  onDrop,
}) => {
  const { isOver, setNodeRef, active, over } = useDroppable({ id });
  const [isHeld, setIsHeld] = useState(false);

  // Log isOver and over states in real-time
  useEffect(() => {
    console.log(
      `Droppable ${id}: isOver = ${isOver}, over = ${over?.id}, active = ${active?.id}`,
    );
  }, [isOver, over, active, id]);

  useEffect(() => {
    const handleMouseDown = () => setIsHeld(true);
    const handleMouseUp = () => {
      if (isOver && over?.id === id) {
        console.log(`Item dropped and released on id: ${id}`); // Log the drop event
        onDrop?.(id); // Trigger the custom onDrop handler
      }
      setIsHeld(false);
    };
    const handleTouchStart = () => setIsHeld(true);
    const handleTouchEnd = () => {
      if (isOver && over?.id === id) {
        console.log(`Item dropped and released on id: ${id}`); // Log the drop event
        onDrop?.(id); // Trigger the custom onDrop handler
      }
      setIsHeld(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOver, over, id, onDrop]); // Add dependencies to ensure the latest state is used

  return (
    <div ref={setNodeRef} className={cn(className, isOver && "bg-green-200")}>
      {children}
    </div>
  );
};

export default Droppable;
