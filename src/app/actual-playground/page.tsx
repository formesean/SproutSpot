import Link from "next/link";

import { LatestPost } from "../_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Sprout,
  Cloud,
  Sun,
  Droplets,
  Wind,
  LucideContainer,
} from "lucide-react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import CsvUploader from "./_components/csv-uploader";
import { Container } from "postcss";

export default async function ActualPlayground() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-[#f0fdf4]">
      <div className="absolute left-9 top-9">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="bg-[#15803d]">☰ Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="border-[#15803d]">
            <DropdownMenuItem>🏠 Home</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              ❌ Quit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#166534]">
            Farm Playgrounds
          </h2>
          <p className="mx-auto max-w-2xl text-[#15803d]">
            Experiment with different variables and see how they affect your
            crop yield in real-time. Use our AI-powered predictions to optimize
            your farming strategy.
          </p>
        </div>
        <div className="flex justify-center md:gap-x-[100px]">
          <div className="m-5">
            <Card className="border-[#15803d]">
              <CardHeader>
                <CardTitle className="font-semibold text-[#166534]">
                  Actual Playground
                </CardTitle>
                <CardDescription className="text-[#15803d]">
                  Digital Twin of your farm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Card className="bg-[url('/grass.png')] bg-contain">
                  <div className="m-1 grid grid-cols-4 grid-rows-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Popover>
                            <PopoverTrigger>
                              <Button className="m-1 border-[1px] border-black bg-[url('/soil.png')] bg-contain sm:h-16 sm:w-16 md:h-[102px] md:w-[102px]">
                                🌽
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 border-[#15803d]">
                              <div className="grid gap-4">
                                <div className="space-y-2">
                                  <h4 className="font-semibold leading-none text-[#166534]">
                                    Crops Details
                                  </h4>
                                  <p className="text-sm text-[#15803d]">
                                    See how your crops are doing.
                                  </p>
                                  <hr className="border-[#15803d]" />
                                </div>
                                <div className="grid gap-2">
                                  <div className="m-1 grid grid-cols-3 items-center gap-4">
                                    <Label
                                      htmlFor="width"
                                      className="font-medium text-[#166534]"
                                    >
                                      Crop Type:
                                    </Label>
                                    <p className="text-sm font-light text-[#15803d]">
                                      "empty"
                                    </p>
                                  </div>
                                  <div className="m-1 grid grid-cols-3 items-center gap-4">
                                    <Label
                                      htmlFor="maxWidth"
                                      className="font-medium text-[#166534]"
                                    >
                                      Crop Count:
                                    </Label>
                                    <p className="text-sm font-light text-[#15803d]">
                                      "empty"
                                    </p>
                                  </div>
                                  <div className="m-1 grid grid-cols-3 items-center gap-4">
                                    <Label
                                      htmlFor="height"
                                      className="font-medium text-[#166534]"
                                    >
                                      Water Level:
                                    </Label>
                                    <p className="text-sm font-light text-[#15803d]">
                                      "empty"
                                    </p>
                                  </div>
                                  <div className="m-1 grid grid-cols-3 items-center gap-4">
                                    <Label
                                      htmlFor="maxHeight"
                                      className="font-medium text-[#166534]"
                                    >
                                      Moisture Level:
                                    </Label>
                                    <p className="text-sm font-light text-[#15803d]">
                                      "empty"
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#77b78a]">
                          <p>🌱 Growth Stage: Seedling</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </div>
          <div className="m-5">
            <Card className="border-[#15803d]">
              <CardHeader>
                <CardTitle className="font-semibold text-[#166534]">
                  Experimental Playground
                </CardTitle>
                <CardDescription className="text-[#15803d]">
                  Where you can test on your farm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Card className="bg-[url('/grass.png')] bg-contain">
                  <div className="m-1 grid grid-cols-4 grid-rows-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Popover>
                            <PopoverTrigger>
                              <Button className="m-1 border-[1px] border-black bg-[url('/soil.png')] bg-contain sm:h-16 sm:w-16 md:h-[102px] md:w-[102px]">
                                🌽
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 border-[#15803d]">
                              <div className="grid gap-4">
                                <div className="space-y-2">
                                  <h4 className="font-semibold leading-none text-[#166534]">
                                    Crops Details
                                  </h4>
                                  <p className="text-sm text-[#15803d]">
                                    See how your crops are doing.
                                  </p>
                                  <hr className="border-[#15803d]" />
                                </div>
                                <div className="grid gap-2">
                                  <div className="m-1 grid grid-cols-3 items-center gap-4">
                                    <Label
                                      htmlFor="width"
                                      className="font-medium text-[#166534]"
                                    >
                                      Crop Type:
                                    </Label>
                                    <p className="text-sm font-light text-[#15803d]">
                                      "empty"
                                    </p>
                                  </div>
                                  <div className="m-1 grid grid-cols-3 items-center gap-4">
                                    <Label
                                      htmlFor="maxWidth"
                                      className="font-medium text-[#166534]"
                                    >
                                      Crop Count:
                                    </Label>
                                    <p className="text-sm font-light text-[#15803d]">
                                      "empty"
                                    </p>
                                  </div>
                                  <div className="m-1 grid grid-cols-3 items-center gap-4">
                                    <Label
                                      htmlFor="height"
                                      className="font-medium text-[#166534]"
                                    >
                                      Water Level:
                                    </Label>
                                    <p className="text-sm font-light text-[#15803d]">
                                      "empty"
                                    </p>
                                  </div>
                                  <div className="m-1 grid grid-cols-3 items-center gap-4">
                                    <Label
                                      htmlFor="maxHeight"
                                      className="font-medium text-[#166534]"
                                    >
                                      Moisture Level:
                                    </Label>
                                    <p className="text-sm font-light text-[#15803d]">
                                      "empty"
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#77b78a]">
                          <p>🌱 Growth Stage: Seedling</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
        <CsvUploader />
      </div>
    </div>
  );
}
