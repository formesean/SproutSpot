import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "~/components/ui/button";
import KeyFeatures from "./_components/key-features";
import FAQ from "./_components/faq";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-b from-green-50 to-green-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">
              SproutSpot
            </span>
          </div>
          <div className="space-x-4">
            <a href="#features">
              <Button
                variant="ghost"
                className="text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                Features
              </Button>
            </a>
            <a href="#about">
              <Button
                variant="ghost"
                className="text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                About
              </Button>
            </a>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-green-800 lg:text-5xl">
            Revolutionize Your Farming with AI
          </h1>
          <p className="mb-8 text-xl text-green-700">
            SproutSpot empowers farmers with AI-driven predictions and digital
            twin simulations to optimize crop yield and sustainability.
          </p>
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
        <section className="mt-24 text-center">
          <h2 className="mb-4 text-3xl font-bold text-green-800">
            Ready to Transform Your Farm?
          </h2>
          <p className="mb-6 text-lg text-green-700">
            Join SproutSpot today and start optimizing your agricultural
            practices with AI.
          </p>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
