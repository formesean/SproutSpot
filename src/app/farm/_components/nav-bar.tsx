"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import CsvUploader from "./csv-uploader";
import type { Session } from "next-auth";
import { useState } from "react";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";

type Farm = {
  id: string;
  name: string;
};

export default function NavBar({
  farms,
  session,
}: {
  farms: Farm[];
  session: Session | null;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredFarm, setHoveredFarm] = useState<string | null>(null);
  const [farmToDelete, setFarmToDelete] = useState<Farm | null>(null);

  const deleteFarmMutation = api.playground.deleteFarm.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const selectedFarmId = searchParams.get("farmId") ?? farms[0]?.id;

  const handleFarmSelect = (farmId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("farmId", farmId);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const confirmDeleteFarm = (farm: Farm) => {
    setFarmToDelete(farm);
  };

  const handleDeleteFarm = () => {
    if (farmToDelete) {
      deleteFarmMutation.mutate({ farmId: farmToDelete.id });
      setFarmToDelete(null);
    }
  };

  return (
    <>
      <div className="absolute right-4 top-4 flex gap-2 sm:right-9 sm:top-9">
        {/* Farm Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#15803d] text-sm sm:text-base">
              🌾 {farms.find((f) => f.id === selectedFarmId)?.name ?? "Farm"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="border-[#15803d]">
            {farms.length > 0 ? (
              farms.map((farm, index) => (
                <DropdownMenuItem
                  key={farm.id}
                  onMouseEnter={() => setHoveredFarm(farm.id)}
                  onMouseLeave={() => setHoveredFarm(null)}
                  className="flex items-center justify-between"
                >
                  <span
                    onClick={() => handleFarmSelect(farm.id)}
                    className="flex-1"
                  >
                    {["🌿", "🌾", "🍀", "🌻", "🌴"][index % 5]} {farm.name}
                  </span>
                  {hoveredFarm === farm.id && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeleteFarm(farm);
                          }}
                        >
                          <Trash size={16} />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete {farmToDelete?.name}
                            ? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setFarmToDelete(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteFarm}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem className="text-gray-500">
                No farms available
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <CsvUploader />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Main Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#15803d] text-sm sm:text-base">
              ☰ Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="border-[#15803d]">
            <DropdownMenuItem>
              <Link href={"/"}>🏠 Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Link
                href={
                  session
                    ? "/api/auth/signout?callbackUrl=/"
                    : `/api/auth/signin?callbackUrl=/farm`
                }
              >
                {session && "❌ Quit"}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
