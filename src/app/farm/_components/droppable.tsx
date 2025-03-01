"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "~/lib/utils";

interface DroppableProps extends PropsWithChildren {
  id: string;
  className?: string;
}

const Droppable: React.FC<DroppableProps> = ({ id, className, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  useEffect(() => {
    if (isOver) {
      console.log(`Item dropped into ${id}`);
    }
  }, [isOver, id]);

  return (
    <div
      ref={setNodeRef}
      className={cn(className, isOver && "bg-green-200")}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
};

export default Droppable;
