import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#166534] py-12 text-[#ffffff]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Branding Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">SproutSpot</h3>
            <p>
              Empowering farmers with AI-driven solutions for sustainable
              agriculture.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:example@gmail.com" className="hover:underline">
                  Gmail
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-[#15803d] pt-8 text-center">
          <p>&copy; 2025 SproutSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
