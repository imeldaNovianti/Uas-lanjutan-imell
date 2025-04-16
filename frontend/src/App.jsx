import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Layout
import CompanyLayout from "./layouts/CompanyLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import LamarPekerjaan from "./pages/LamarPekerjaan";
import Home from "./pages/Home";
import LoginCompany from "./pages/LoginCompany";
import RegisterCompany from "./pages/RegisterCompany";
import DashboardCompany from "./pages/DashboardCompany";
import CompanyPostJob from "./pages/CompanyPostJob";
import CompanyApplicants from "./pages/CompanyApplicants";
import LandingPages from "./pages/Landing-Pages";
import About from "./pages/About";
import Aksesibilitas from "./pages/Aksesibilitas";
import PusatKeamanan from "./pages/PusatKeamanan";
import AllJobs from "./pages/AllJobs";  // Import AllJobs

// Komponen
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation(); // Gunakan useLocation untuk melacak perubahan path
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLandingPage = location.pathname === "/"; // Periksa jika berada di landing page

    // Pastikan header hanya muncul setelah login dan bukan di halaman landing
    if (token && !isLandingPage) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [location.pathname]); // Gunakan location.pathname agar kondisi diperbarui saat rute berubah

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        {/* Halaman Awal */}
        <Route path="/" element={<LandingPages />} />

        {/* Pelamar/User */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lamar/:id"
          element={
            <ProtectedRoute>
              <LamarPekerjaan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Company Login */}
        <Route path="/company/login" element={<LoginCompany />} />
        <Route path="/company/register" element={<RegisterCompany />} />

        {/* Halaman Company */}
        <Route path="/company" element={<CompanyLayout />}>
          <Route path="dashboard" element={<DashboardCompany />} />
          <Route path="post-job" element={<CompanyPostJob />} />
          <Route path="applicants" element={<CompanyApplicants />} />
          <Route path="all-jobs" element={<AllJobs />} /> {/* Add route for AllJobs */}
        </Route>

        {/* Halaman Umum */}
        <Route path="/about" element={<About />} />
        <Route path="/aksesibilitas" element={<Aksesibilitas />} />
        <Route path="/pusat-keamanan" element={<PusatKeamanan />} />
      </Routes>
    </>
  );
}
