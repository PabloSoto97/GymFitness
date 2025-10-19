import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dumbbell, Home, List, Menu, X, LogOut, LogIn } from "lucide-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rol, setRol] = useState(localStorage.getItem("rol"));
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Inicio", icon: <Home size={20} /> },
    { to: "/ejercicios", label: "Ejercicios", icon: <Dumbbell size={20} /> },
    { to: "/rutinas", label: "Rutinas", icon: <List size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setRol(null); // <-- actualiza el estado al instante
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    setRol(storedRol);
  }, []);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="fixed top-4 left-4 z-50 bg-pink-600 text-white p-2 rounded-lg shadow-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 flex-shrink-0 bg-[#0f0f0f] text-white flex flex-col shadow-2xl z-40 transform transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="text-center py-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 tracking-wide">
            FitnessGirl
          </h1>
        </div>

        {/* Menú */}
        {rol ? (
          <nav className="flex-1 flex flex-col p-4 gap-2">
            {links.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-lg scale-105"
                      : "hover:bg-[#1a1a1a] hover:text-pink-400"
                  }`
                }
              >
                {icon}
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}

            {/* Botón Cerrar Sesión */}
            <button
              onClick={handleLogout}
              className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 py-2 rounded-lg font-semibold shadow-lg shadow-red-600/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <LogOut size={18} />
              <span>Cerrar sesión</span>
            </button>
          </nav>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <button
              onClick={handleLogin}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg shadow-pink-600/40 transition-all duration-300 hover:scale-[1.03]"
            >
              <LogIn size={18} />
              <span>Iniciar sesión</span>
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm py-4 border-t border-gray-800 opacity-60">
          <p>© 2025 FitnessGirl</p>
        </div>
      </aside>
    </>
  );
};
