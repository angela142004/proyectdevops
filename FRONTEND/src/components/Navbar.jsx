import React, { useState, useEffect, useContext } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import insignia from "../assets/insignia_prima_sinfondo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/Registro", label: "Registro" },
    { href: "/Nosotros", label: "Nosotros" },
    { href: "/Blog", label: "Blog" },
    { href: "/Comunicado", label: "Eventos y Comunicados" },
    { href: "/Comunidad", label: "Comunidad" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".navbar-header");
      if (!header) return;
      if (window.scrollY >= 80) header.classList.add("scroll-header");
      else header.classList.remove("scroll-header");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar-header fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md transition-all duration-300">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 md:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={insignia} alt="Insignia" className="w-9 h-9" />
          <span className="text-lg font-bold text-[#003049] tracking-wide">
            PRISMA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`relative text-sm font-medium px-2 py-1 transition-colors duration-300 ${
                currentPath === href
                  ? "text-[#003049] font-bold after:w-full"
                  : "text-[#003049] hover:text-[#00263d]"
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#003049] after:w-0 hover:after:w-full after:transition-all after:duration-300`}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/Panel"
              className="text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Panel
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.prisma.sigedu.pe/login.php?usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#003049] text-white text-sm px-3 py-1.5 rounded-md font-medium shadow-md hover:bg-[#00263d] transition"
          >
            SIGEDU
          </a>
          <Link
            to="/Login"
            className="text-[#003049] hover:text-[#00263d] transition"
          >
            <User size={22} strokeWidth={2} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-gray-200 bg-white/80 shadow hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <HiX className="w-7 h-7 text-[#003049]" />
          ) : (
            <HiMenu className="w-7 h-7 text-[#003049]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 border-t border-gray-100 px-4 py-5 space-y-3 transition-all duration-300 shadow-xl">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base font-medium rounded-lg px-3 py-2 transition-all duration-200 ${
                currentPath === href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-800 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/Panel"
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-semibold rounded-lg px-3 py-2 text-blue-700 hover:bg-blue-100"
            >
              Panel
            </Link>
          )}
          <a
            href="https://www.prisma.sigedu.pe/login.php?usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2 mt-2 bg-[#003049] text-white rounded-md font-medium hover:bg-[#00263d] transition"
          >
            SIGEDU
          </a>
          <Link
            to="/Login"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-center py-2 mt-2 text-[#003049] font-medium hover:text-[#00263d] transition"
          >
            <User className="inline mr-1" size={18} />
            Iniciar Sesión
          </Link>
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.35s cubic-bezier(.39,1.73,.71,.89); }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease; }
      `}</style>
    </nav>
  );
};

export default Navbar;
