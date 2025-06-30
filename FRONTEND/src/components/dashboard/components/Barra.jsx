import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { FiLogOut, FiX, FiGrid } from "react-icons/fi"; // <- Usamos FiGrid en lugar de FiMenu

const items = [
  { label: "Dashboard", to: "/Panel", icon: "📊" },
  { label: "Publicaciones", to: "/Panel/Publicaciones", icon: "📰" },
  { label: "Eventos", to: "/Panel/Eventos", icon: "📅" },
  { label: "Comunicados", to: "/Panel/Comunicados", icon: "📢" },
  { label: "Usuarios", to: "/Panel/Usuarios", icon: "👩‍🏫" },
  { label: "Interesados", to: "/Panel/Interesados", icon: "👩‍💼" },
];

export default function Barra() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, admin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6 px-4 bg-[#1a2433] text-white w-56">
      <div className="mb-8 flex justify-between items-center">
        <span className="font-bold text-lg">Colegio Admin</span>
        <button
          className="md:hidden text-white hover:text-red-400"
          onClick={toggleMenu}
        >
          <FiX size={20} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2">
          {items
            .filter((_, index) => (!admin ? index !== 4 && index !== 5 : true))
            .map(({ label, to, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    location.pathname === to
                      ? "bg-[#23304a] font-semibold"
                      : "hover:bg-[#23304a]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <button
        className="mt-6 flex items-center gap-2 text-sm text-red-300 hover:text-red-500 transition-colors"
        onClick={handleLogout}
      >
        <FiLogOut size={18} />
        Cerrar Sesión
      </button>
      <footer className="mt-6 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Colegio Admin
      </footer>
    </div>
  );

  return (
    <>
      {/* Menú fijo en escritorio */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen z-40">
        <SidebarContent />
      </aside>

      {/* Botón menú en la esquina inferior izquierda en móviles */}
      <button
        className="md:hidden fixed bottom-4 left-4 z-50 bg-[#1a2433] text-white p-3 rounded-full shadow-lg hover:bg-[#2d3645] transition"
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <FiGrid size={22} />
      </button>

      {/* Menú lateral deslizable para móvil */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <aside className="fixed top-0 left-0 h-full w-56 bg-[#1a2433] shadow-xl transition-all duration-300 z-50">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
