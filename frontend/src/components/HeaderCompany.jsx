import { Link, useNavigate } from "react-router-dom";
import { Home, Briefcase, Users, LogOut, Edit, Trash2 } from "lucide-react";

export default function HeaderCompany() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold tracking-wide text-gray-800 hover:scale-105 transition-transform">
          <Link to="/company/dashboard" aria-label="Company Dashboard Home">
            Company Portal
          </Link>
        </h1>

        <nav className="flex gap-6 text-sm font-medium items-center">
          <Link
            to="/company/dashboard"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition duration-200"
          >
            <Home size={18} />
            Dashboard
          </Link>

          <Link
            to="/company/post-job"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition duration-200"
          >
            <Briefcase size={18} />
            Post Job
          </Link>

          <Link
            to="/company/applicants"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition duration-200"
          >
            <Users size={18} />
            Applicants
          </Link>

          <Link
            to="/company/all-jobs"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition duration-200"
          >
            <Briefcase size={18} />
            All Jobs
          </Link>

          {/* Tombol Edit dan Delete jika berada di halaman All Jobs */}
          {/* <Link
            to="/company/edit-job"
            className="flex items-center gap-2 text-green-500 hover:text-green-600 transition duration-200"
          >
            <Edit size={18} />
            Edit Job
          </Link> */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-600 transition duration-200"
            aria-label="Logout"
          >
            <LogOut size={18} />
            Logout
          </button>

          {/* Tombol Delete jika berada di halaman All Jobs */}
          {/* <button
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition duration-200"
            aria-label="Delete Job"
          >
            <Trash2 size={18} />
            Delete Job
          </button> */}
        </nav>
      </div>
    </header>
  );
}
