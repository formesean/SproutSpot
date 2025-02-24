import { Button } from "../_components/button";
import { ArrowRight, Leaf} from "lucide-react"
import KeyFeaturesSection from "../_sections/KeyFeaturesSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/accordion";

const LandingPage = () => {
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
                  Sign In
                </Button>
              </div>
            </nav>
          </header>
    
          <main className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center mb-24">
              <h1 className="text-4xl lg:text-5xl font-bold text-green-800 mb-6">Revolutionize Your Farming with AI</h1>
              <p className="text-xl text-green-700 mb-8">
                SproutSpot empowers farmers with AI-driven predictions and digital twin simulations to optimize crop yield
                and sustainability.
              </p>
            </div>
    
            {/* KEY FEATURES SECTION*/}
            <KeyFeaturesSection/> 
            
            {/* FAQ SECTION */}
            <section className="mt-24 text-center">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="text-justify">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="question-1">
                  <AccordionTrigger>
                    <h3 className="text-xl text-green-700">How does SproutSpot use AI to improve farming?</h3>
                    </AccordionTrigger>
                  <AccordionContent>
                  <p className="text-green-700 mb-4">SproutSpot utilizes advanced machine learning algorithms to analyze various factors such as soil conditions, weather patterns, and historical crop data. This AI-driven approach provides accurate predictions and personalized recommendations for optimizing crop yield and resource management.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
    
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="question-2">
                  <AccordionTrigger>
                    <h3 className="text-xl text-green-700">What is a digital twin farm and how does it work?</h3>
                    </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-green-700 mb-4">A digital twin farm is a virtual representation of your physical farm. It simulates real-world conditions and allows you to experiment with different variables without risk. This helps in making informed decisions about crop management, resource allocation, and long-term planning.</p>
                    </AccordionContent>
                </AccordionItem>
              </Accordion>
    
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="question-3">
                <AccordionTrigger>
                    <h3 className="text-xl text-green-700">Can SproutSpot integrate with my existing farm management systems?</h3>
                    </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-green-700 mb-4">Yes, SproutSpot is designed to be compatible with many popular farm management systems. It can import data from various sources, including IoT devices, weather stations, and soil sensors, to provide a comprehensive analysis of your farm's performance.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            </section>
            
            {/* SIGN UP */}
            <section className="mt-24 text-center">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Ready to Transform Your Farm?</h2>
              <p className="text-lg text-green-700 mb-6">
                Join SproutSpot today and start optimizing your agricultural practices with AI.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </section>
          </main>
    
          <footer className="bg-[#166534] text-[#ffffff] py-12">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">SproutSpot</h3>
                        <p>Empowering farmers with AI-driven solutions for sustainable agriculture.</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
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
                          <li>
                            <a href="#" className="hover:underline">
                              Contact
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Connect</h3>
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
                    <div className="mt-8 pt-8 border-t border-[#15803d] text-center">
                      <p>&copy; 2025 SproutSpot. All rights reserved.</p>
                    </div>
                  </div>
                </footer>
              </div>
      ) 
}

export default LandingPage;