import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FaBars, FaXmark } from "react-icons/fa6"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-green-700 whitespace-nowrap"
      : "text-gray-700 hover:text-green-700 transition whitespace-nowrap"

  return (
    <nav className="bg-white border-b border-gray-200 relative z-50">

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-6 py-3 md:py-3.5 lg:py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 shrink-0"
        >
          {/* Logo Icon */}
          <div className="w-9 h-9 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-green-700 rounded-full flex items-center justify-center">
            <span className="text-white text-lg md:text-lg lg:text-xl">
              🐾
            </span>
          </div>

          {/* Logo Text */}
          <div>
            <h1 className="text-lg md:text-lg lg:text-xl font-bold text-green-900 leading-tight">
              WildGuard
            </h1>

            <p className="text-[10px] md:text-[10px] lg:text-xs text-gray-500 leading-tight">
              Protect. Preserve. Coexist.
            </p>
          </div>
        </Link>

        {/* Desktop + Tablet Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">

          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            <span className="text-sm lg:text-base">
              Home
            </span>
          </NavLink>

          <NavLink
            to="/wildlife"
            className={navLinkClass}
          >
            <span className="text-sm lg:text-base">
              Wildlife
            </span>
          </NavLink>

          <NavLink
            to="/programs"
            className={navLinkClass}
          >
            <span className="text-sm lg:text-base">
              Programs
            </span>
          </NavLink>

          <NavLink
            to="/blog"
            className={navLinkClass}
          >
            <span className="text-sm lg:text-base">
              Blog
            </span>
          </NavLink>

          <NavLink
            to="/join"
            className={navLinkClass}
          >
            <span className="text-sm lg:text-base">
              Join Team
            </span>
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            <span className="text-sm lg:text-base">
              Contact
            </span>
          </NavLink>

        </div>

        {/* CTA */}
        <Link
          to="/join"
          className="hidden md:inline-flex shrink-0 bg-green-700 text-white text-xs lg:text-base px-4 md:px-4 lg:px-5 py-2 md:py-2 lg:py-2.5 rounded-lg font-medium hover:bg-green-800 transition whitespace-nowrap"
        >
          Join the Mission
        </Link>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-green-900 text-2xl p-2 rounded-lg hover:bg-green-50 transition"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaXmark /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">

          <div className="px-6 py-5">

            <div className="flex flex-col gap-5">

              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={navLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/wildlife"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Wildlife
              </NavLink>

              <NavLink
                to="/programs"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Programs
              </NavLink>

              <NavLink
                to="/blog"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Blog
              </NavLink>

              <NavLink
                to="/join"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Join Team
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Contact
              </NavLink>

              <Link
                to="/join"
                onClick={closeMenu}
                className="inline-flex items-center justify-center bg-green-700 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-800 transition"
              >
                Join the Mission
              </Link>

            </div>

          </div>

        </div>
      )}

    </nav>
  )
}

export default Navbar