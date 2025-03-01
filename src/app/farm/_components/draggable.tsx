"use client";

import React, { PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps extends PropsWithChildren {
  id: string;
}

const Draggable: React.FC<DraggableProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style: React.CSSProperties | undefined = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="pointer-events-auto cursor-none"
    >
      {children}
    </button>
  );
};

export default Draggable;
