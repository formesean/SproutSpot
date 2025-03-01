"use client";

import { Droplets, Sprout, Shield, Cloud, FlaskConical } from "lucide-react";
import { Dock, DockIcon } from "~/components/magicui/dock";
import Draggable from "./draggable";

export function Dockbar() {
  return (
    <Dock
      className="pointer-events-auto fixed bottom-0 left-1/2 mb-7 -translate-x-1/2 transform cursor-none px-7 py-10 shadow-2xl max-sm:px-3 max-sm:py-9"
      direction="middle"
      iconMagnification={50}
      iconDistance={100}
    >
      <DockIcon className="pointer-events-auto cursor-none">
        <Draggable id="1">
          <Droplets className="size-full text-[#15803d] max-sm:size-auto" />
        </Draggable>
      </DockIcon>
      <DockIcon className="pointer-events-auto cursor-none">
        <Draggable id="2">
          <Sprout className="size-full text-[#15803d] max-sm:size-auto" />
        </Draggable>
      </DockIcon>
      <DockIcon className="pointer-events-auto cursor-none">
        <Draggable id="3">
          <Shield className="size-full text-[#15803d] max-sm:size-auto" />
        </Draggable>
      </DockIcon>
      <DockIcon className="pointer-events-auto cursor-none">
        <Draggable id="4">
          <Cloud className="size-full text-[#15803d] max-sm:size-auto" />
        </Draggable>
      </DockIcon>
      <DockIcon className="pointer-events-auto cursor-none">
        <Draggable id="5">
          <FlaskConical className="size-full text-[#15803d] max-sm:size-auto" />
        </Draggable>
      </DockIcon>
    </Dock>
  );
}
