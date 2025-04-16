import { Link, useNavigate } from "react-router-dom";
import { Home, Briefcase, LogOut, User, Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Apakah kamu yakin ingin keluar?");
    if (confirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      setRole(null);
      navigate("/");
    }
  };

  const homePath = role === "company" ? "/company/dashboard" : "/home";

  return (
    <header className="bg-gradient-to-r from-indigo-200 via-pink-200 to-yellow-100 text-black shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo + Judul */}
        <div className="flex items-center space-x-4">
          <img
            src="src/assets/1-removebg-preview.png"
            alt="Logo"
            className="w-28 h-28 object-contain"
          />
          <h1 className="text-4xl font-script font-bold tracking-wide">
            I CLOUD JOB
          </h1>
        </div>

        {/* Navigasi */}
        <nav className="flex items-center gap-8 text-lg font-semibold">
          {isLoggedIn ? (
            <>
              <NavItem to={homePath} icon={<Home size={24} />} text="Beranda" />
              {role !== "company" && (
                <NavItem to="/jobs" icon={<Briefcase size={24} />} text="Lowongan" />
              )}
              <NavItem to="/about" icon={<Info size={24} />} text="Tentang" />
              {role !== "company" && (
                <NavItem to="/profile" icon={<User size={24} />} text="Profil" />
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:underline hover:text-red-600 transition duration-200 text-xl font-script"
              >
                <LogOut size={24} />
                <span>Keluar</span>
              </button>
            </>
          ) : (
            <>
              <NavItem to="/" icon={<Home size={24} />} text="Beranda" />
              <NavItem to="/about" icon={<Info size={24} />} text="Tentang" />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 hover:underline hover:text-indigo-500 transition duration-200 text-xl font-script"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
