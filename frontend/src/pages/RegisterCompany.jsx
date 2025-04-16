// src/pages/company/RegisterCompany.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterCompany = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:4000/api/company/register", form, {
        withCredentials: true,
      });
      navigate("/company/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?office,tech,company')",
      }}
    >
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-blue-700 to-black text-white">
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
            alt="Company Icon"
            className="w-24 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <h2 className="text-3xl font-bold text-center mb-4 leading-snug">
            Bangun Masa Depan <br /> Perusahaanmu
          </h2>
          <ul className="text-sm space-y-3 text-center">
            <li>🚀 Posting Lowongan dalam hitungan detik</li>
            <li>📊 Kelola pelamar dan wawancara dengan mudah</li>
            <li>🤝 Terhubung langsung dengan talenta berkualitas</li>
            <li>🔒 Sistem aman dan modern dengan teknologi terkini</li>
          </ul>
          <p className="mt-6 text-xs text-gray-200 text-center italic">
            “Solusi rekrutmen modern, cepat, dan efisien”
          </p>
        </div>

        {/* Form Registrasi */}
        <div className="md:w-1/2 w-full p-8 bg-white bg-opacity-90 text-black">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Daftar Sebagai Perusahaan
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="company_name"
              placeholder="Nama Perusahaan"
              value={form.company_name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
