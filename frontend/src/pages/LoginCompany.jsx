// src/pages/LoginCompany.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginCompany() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/company/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login berhasil:", res.data);
      window.alert("Login berhasil sebagai perusahaan!");
      navigate("/company/dashboard");
    } catch (err) {
      console.error("Gagal login:", err.response?.data || err.message);
      window.alert(err.response?.data?.message || "Login gagal. Terjadi kesalahan.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-200 via-blue-100 to-gray-100">
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white w-full lg:w-1/2 p-10"
      >
        <img
          src="https://i.pinimg.com/736x/dc/38/07/dc3807e84cad06846cc5892e914034a6.jpg"
          alt="Illustration"
          className="w-full max-w-md mb-8 rounded-xl shadow-lg"
        />
        <h2 className="text-5xl font-bold mb-4 text-center leading-tight">
          Temukan Talenta Terbaik untuk Perusahaan Anda
        </h2>
        <p className="text-lg text-center max-w-lg">
          Portal rekrutmen yang efisien dan terpercaya. Mulailah mencari kandidat terbaik bersama kami.
        </p>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8"
      >
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
            Login Perusahaan
          </h2>

          {/* BACK BUTTON */}
          <div className="mb-6 text-left">
            <Link
              to="/"
              className="text-blue-600 hover:underline text-sm flex items-center"
            >
              ← Kembali ke Beranda
            </Link>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="email@perusahaan.com"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Belum punya akun perusahaan?{" "}
            <Link to="/company/register" className="text-blue-700 hover:underline font-medium">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
