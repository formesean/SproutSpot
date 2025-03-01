"use client";

import { Droplets, Sprout, Shield, Cloud, FlaskConical } from "lucide-react";
import { Dock, DockIcon } from "~/components/magicui/dock";
import { useDrag } from "react-dnd";
import { useCallback, useEffect, useState } from "react";
import { Pointer } from "~/components/magicui/pointer";

export function Dockbar() {
  const [isDragging, setIsDragging] = useState(false);

  const [{ isDragging: isWaterDragging }, waterDrag, waterPreview] = useDrag(
    () => ({
      type: "dockIcon",
      item: { type: "water" },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
  );

  const [{ isDragging: isSeedDragging }, seedDrag, seedPreview] = useDrag(
    () => ({
      type: "dockIcon",
      item: { type: "seed" },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
  );

  const [{ isDragging: isShieldDragging }, shieldDrag, shieldPreview] = useDrag(
    () => ({
      type: "dockIcon",
      item: { type: "shield" },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
  );

  const [{ isDragging: isCloudDragging }, cloudDrag, cloudPreview] = useDrag(
    () => ({
      type: "dockIcon",
      item: { type: "cloud" },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
  );

  const [{ isDragging: isFlaskDragging }, flaskDrag, flaskPreview] = useDrag(
    () => ({
      type: "dockIcon",
      item: { type: "flask" },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
  );

  // Ref callback to attach the drag source
  const setWaterRef = useCallback(
    (node: HTMLDivElement | null) => {
      waterDrag(node);
    },
    [waterDrag],
  );

  const setSeedRef = useCallback(
    (node: HTMLDivElement | null) => {
      seedDrag(node);
    },
    [seedDrag],
  );

  const setShieldRef = useCallback(
    (node: HTMLDivElement | null) => {
      shieldDrag(node);
    },
    [shieldDrag],
  );

  const setCloudRef = useCallback(
    (node: HTMLDivElement | null) => {
      cloudDrag(node);
    },
    [cloudDrag],
  );

  const setFlaskRef = useCallback(
    (node: HTMLDivElement | null) => {
      flaskDrag(node);
    },
    [flaskDrag],
  );

  useEffect(() => {
    if (isWaterDragging) {
      document.body.classList.add("dragging");
      setIsDragging(true);
    } else {
      document.body.classList.remove("dragging");
      setIsDragging(false);
    }
  }, [isWaterDragging]);

  return (
    <>
      <Dock
        className="pointer-events-auto fixed bottom-0 left-1/2 mb-7 -translate-x-1/2 transform cursor-none px-7 py-10 shadow-2xl max-sm:px-3 max-sm:py-9"
        direction="middle"
      >
        <div ref={setWaterRef} style={{ opacity: isWaterDragging ? 0.5 : 1 }}>
          <DockIcon className="pointer-events-auto cursor-none">
            <Droplets className="size-full text-[#15803d] max-sm:size-auto" />
          </DockIcon>
        </div>
        <div ref={setSeedRef} style={{ opacity: isSeedDragging ? 0.5 : 1 }}>
          <DockIcon className="pointer-events-auto cursor-none">
            <Sprout className="size-full text-[#15803d] max-sm:size-auto" />
          </DockIcon>
        </div>
        <div
          ref={setShieldRef}
          style={{
            opacity: isShieldDragging ? 0.5 : 1,
            cursor: isShieldDragging ? "!imporant none" : "auto",
          }}
        >
          <DockIcon className="pointer-events-auto cursor-none">
            <Shield className="size-full text-[#15803d] max-sm:size-auto" />
          </DockIcon>
        </div>
        <div ref={setCloudRef} style={{ opacity: isCloudDragging ? 0.5 : 1 }}>
          <DockIcon className="pointer-events-auto cursor-none">
            <Cloud className="size-full text-[#15803d] max-sm:size-auto" />
          </DockIcon>
        </div>
        <div ref={setFlaskRef} style={{ opacity: isFlaskDragging ? 0.5 : 1 }}>
          <DockIcon className="pointer-events-auto cursor-none">
            <FlaskConical className="size-full text-[#15803d] max-sm:size-auto" />
          </DockIcon>
        </div>
      </Dock>
      {isDragging && (
        <Pointer
          ref={waterPreview}
          className="!z-50 fill-[#15803d]"
          style={{
            position: "fixed",
            pointerEvents: "none",
            left: 0,
            top: 0,
            transform: "translate(-50%, -50%)", // Center the preview on the cursor
          }}
        />
      )}
    </>
  );
}
