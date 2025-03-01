"use client";

import { Droplets, Sprout, Shield, Cloud, FlaskConical } from "lucide-react";
import { Dock, DockIcon } from "~/components/magicui/dock";

export function Dockbar() {
  return (
    <Dock
      className="pointer-events-auto fixed bottom-0 left-1/2 mb-7 -translate-x-1/2 transform cursor-none px-7 py-10 shadow-2xl max-sm:px-3 max-sm:py-9"
      direction="middle"
    >
      <DockIcon className="pointer-events-auto cursor-none">
        <Droplets className="size-full text-[#15803d] max-sm:size-auto" />
      </DockIcon>
      <DockIcon className="pointer-events-auto cursor-none">
        <Sprout className="size-full text-[#15803d] max-sm:size-auto" />
      </DockIcon>
      <DockIcon className="pointer-events-auto cursor-none">
        <Shield className="size-full text-[#15803d] max-sm:size-auto" />
      </DockIcon>
      <DockIcon className="pointer-events-auto cursor-none">
        <Cloud className="size-full text-[#15803d] max-sm:size-auto" />
      </DockIcon>
      <DockIcon className="pointer-events-auto cursor-none">
        <FlaskConical className="size-full text-[#15803d] max-sm:size-auto" />
      </DockIcon>
    </Dock>
  );
}
