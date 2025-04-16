import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", formData, {
        withCredentials: true,
      });
      alert("Register berhasil!");
      console.log(res.data);
    } catch (err) {
      console.error("Register gagal:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Register gagal");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Daftar Akun Baru</h2>
            <p className="text-gray-600 mb-4">
              Bergabunglah dengan komunitas profesional dan temukan peluang kerja impianmu!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Daftar Sekarang
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-purple-600 hover:underline font-medium">
                Masuk di sini
              </Link>
            </p>
          </div>

          <div className="hidden md:block">
            <img
              src="src/assets/1.jpg"
              alt="Iklan Aplikasi"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Kenapa Pilih I CLOUD JOB?</h3>
              <p className="text-gray-600">
                ✔️ Jutaan lowongan pekerjaan dari perusahaan ternama<br />
                ✔️ Proses melamar cepat dan mudah<br />
                ✔️ Pelamar & Perusahaan dalam satu platform
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
