import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import KeyFeatures from "./_components/key-features";
import FAQ from "./_components/faq";
import Footer from "./_components/footer";
import { auth } from "~/server/auth";
import Link from "next/link";
import NavBar from "./_components/nav-bar";
import { Pointer } from "~/components/magicui/pointer";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-b from-green-50 to-green-100">
      <NavBar session={session} />

      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-24">
          <h1 className="mb-4 text-3xl font-bold text-green-800 sm:text-4xl lg:text-5xl">
            Revolutionize Your Farming with AI
          </h1>
          <p className="mb-6 text-lg text-green-700 sm:text-xl">
            SproutSpot empowers farmers with AI-driven predictions and digital
            twin simulations to optimize crop yield and sustainability.
          </p>

          {/* Embedded Video */}
          <div className="relative mx-auto max-w-2xl">
            <video className="w-full rounded-lg shadow-xl" controls>
              <source src="/SproutSpot.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* KEY FEATURES SECTION*/}
        <section id="features">
          <KeyFeatures />
        </section>

        {/* FAQ SECTION */}
        <section id="about">
          <FAQ />
        </section>

        {/* SIGN IN */}
        <section className="mt-12 text-center sm:mt-24">
          <h2 className="mb-4 text-2xl font-bold text-green-800 sm:text-3xl">
            Ready to Transform Your Farm?
          </h2>
          <p className="mb-6 text-lg text-green-700">
            Join SproutSpot today and start optimizing your agricultural
            practices with AI.
          </p>
          <Link
            href={session ? "/farm" : `/api/auth/signin?callbackUrl=/farm`}
            prefetch={true}
          >
            <Button className="pointer-events-auto cursor-none bg-green-600 text-white hover:bg-green-700">
              {session ? "Continue Journey" : "Sign in"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
      <Pointer className="!z-50 fill-[#15803d]" />
    </div>
  );
}
