import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "./_components/button";
import { Leaf } from "./_components/Leaf";


export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">SproutSpot</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-100">
              Features
            </Button>
            <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-100">
              About
            </Button>
            <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-100">
              Contact
            </Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Login
            </Button>
          </div>
        </nav>
      </header>
    </div>
  );
}
