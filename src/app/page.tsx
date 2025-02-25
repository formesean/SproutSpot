import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "~/components/ui/button";
import KeyFeaturesSection from "./_components/KeyFeaturesSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

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
          <KeyFeaturesSection />
        </section>

        {/* FAQ SECTION */}
        <section id="about" className="mt-24 text-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-green-800">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="text-justify">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="question-1">
                <AccordionTrigger>
                  <h3 className="text-xl text-green-700">
                    How does SproutSpot use AI to improve farming?
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-green-700">
                    SproutSpot utilizes advanced machine learning algorithms to
                    analyze various factors such as soil conditions, weather
                    patterns, and historical crop data. This AI-driven approach
                    provides accurate predictions and personalized
                    recommendations for optimizing crop yield and resource
                    management.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="question-2">
                <AccordionTrigger>
                  <h3 className="text-xl text-green-700">
                    What is a digital twin farm and how does it work?
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-green-700">
                    A digital twin farm is a virtual representation of your
                    physical farm. It simulates real-world conditions and allows
                    you to experiment with different variables without risk.
                    This helps in making informed decisions about crop
                    management, resource allocation, and long-term planning.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="question-3">
                <AccordionTrigger>
                  <h3 className="text-xl text-green-700">
                    Can SproutSpot integrate with my existing farm management
                    systems?
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-green-700">
                    Yes, SproutSpot is designed to be compatible with many
                    popular farm management systems. It can import data from
                    various sources, including IoT devices, weather stations,
                    and soil sensors, to provide a comprehensive analysis of
                    your farm's performance.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* SIGN UP */}
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

      <footer className="bg-[#166534] py-12 text-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-semibold">SproutSpot</h3>
              <p>
                Empowering farmers with AI-driven solutions for sustainable
                agriculture.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-[#15803d] pt-8 text-center">
            <p>&copy; 2025 SproutSpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
