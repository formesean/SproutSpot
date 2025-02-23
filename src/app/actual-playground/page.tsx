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
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import CsvUploader from "./_components/csv-uploader";

export default async function ActualPlayground() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="m-5">
        <Card>
          <CardHeader>
            <CardTitle>Actual Playground</CardTitle>
            <CardDescription>Digital Twin of your farm</CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="bg-green-700">
              <div className="grid grid-cols-3 grid-rows-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="m-5 size-10 bg-yellow-900 p-10">
                            Corn
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                Crops Details
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                See how your crops are doing.
                              </p>
                              <hr />
                            </div>
                            <div className="grid gap-2">
                              <div className="m-1 grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="width">Crop Type:</Label>
                                <p className="text-sm text-muted-foreground">
                                  Corn
                                </p>
                              </div>
                              <div className="m-1 grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="maxWidth">Crop Count:</Label>
                                <p className="text-sm text-muted-foreground">
                                  24
                                </p>
                              </div>
                              <div className="m-1 grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="height">Water Level:</Label>
                                <p className="text-sm text-muted-foreground">
                                  1.6 inches
                                </p>
                              </div>
                              <div className="m-1 grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="maxHeight">
                                  Moisture Level:
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  30
                                </p>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>🌱 Growth Stage: Seedling</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Card>
          </CardContent>
          <CardFooter>
            <CsvUploader/>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
