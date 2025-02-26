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

  const selectedFarmId = searchParams.get("farmId") ?? farms[0]?.id;

  const handleFarmSelect = (farmId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("farmId", farmId);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="absolute right-9 top-9 flex gap-2">
        {/* Farm Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#15803d]">
              🌾 {farms.find((f) => f.id === selectedFarmId)?.name ?? "Farm"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="border-[#15803d]">
            {farms.length > 0 ? (
              farms.map((farm, index) => (
                <DropdownMenuItem
                  key={farm.id}
                  onClick={() => handleFarmSelect(farm.id)}
                >
                  {["🌿", "🌾", "🍀", "🌻", "🌴"][index % 5]} {farm.name}
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
            <Button className="bg-[#15803d]">☰ Menu</Button>
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
