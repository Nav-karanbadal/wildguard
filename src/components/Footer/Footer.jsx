import { Link } from "react-router-dom"
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6"

function Footer() {
  return (
    <footer className="bg-green-950 text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">
                🐾 WildGuard
              </h2>

              <p className="text-sm text-green-300 mt-1">
                Protect. Preserve. Coexist.
              </p>
            </Link>

            <p className="text-green-100/80 leading-7 max-w-sm">
              A cleaner, greener and safer world for
              wildlife and future generations.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">

              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="X"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition"
              >
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/wildlife"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Wildlife
                </Link>
              </li>

              <li>
                <Link
                  to="/programs"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Programs
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  to="/join"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Join Team
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Resources
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/wildlife"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Wildlife
                </Link>
              </li>

              <li>
                <Link
                  to="/programs"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Programs
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="text-green-100/80 hover:text-white transition"
                >
                  Blog
                </Link>
              </li>
{/* 
              <li>
                <a
                  href="#"
                  className="text-green-100/80 hover:text-white transition"
                >
                  FAQ
                </a>
              </li> */}

            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Stay Connected
            </h3>

            <p className="text-green-100/80 leading-6 mb-5">
              Get the latest conservation stories,
              wildlife updates and ways to make a difference.
            </p>

            <form className="flex flex-col sm:flex-row lg:flex-col gap-2">

              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-gray-800 bg-white outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                type="submit"
                className="px-5 py-3 bg-green-500 rounded-lg font-semibold hover:bg-green-400 transition"
              >
                Subscribe
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm text-green-100/60">
            © 2026 WildGuard. All rights reserved.
          </p>

          <p className="text-sm text-green-100/60">
            Protect wildlife. Preserve our future.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer