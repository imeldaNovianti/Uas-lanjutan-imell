import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Briefcase, Smartphone, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login", // Pastikan endpoint sesuai dengan yang ada di BE
        { email, password },
        { withCredentials: true }
      );

      console.log("Login berhasil:", response.data);

      // Menyimpan token dan role di localStorage agar bisa digunakan nanti
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role); // Jika ada role di respons backend
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Menyimpan data user

      // Tampilkan alert dan arahkan setelah klik OK
      alert("Login berhasil! Selamat datang di I CLOUD JOB.");
      navigate("/home"); // Arahkan ke halaman home setelah login berhasil
    } catch (error) {
      console.error("Login gagal:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login gagal! Periksa email dan password.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const fiturItems = [
    {
      icon: <Briefcase className="w-7 h-7 text-white" />,
      title: "Ribuan lowongan",
      desc: "Update setiap hari dari perusahaan ternama.",
    },
    {
      icon: <Smartphone className="w-7 h-7 text-white" />,
      title: "Mobile-friendly",
      desc: "Akses cepat dari HP, kapan saja.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-white" />,
      title: "Keamanan terjamin",
      desc: "Data terenkripsi dan dijaga kerahasiaannya.",
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-white" />,
      title: "Fitur pelamar unggulan",
      desc: "Tracking lamaran dan rekomendasi personal.",
    },
    {
      icon: <Users className="w-7 h-7 text-white" />,
      title: "Komunitas Karier",
      desc: "Terhubung dengan pelamar dan recruiter.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-6 py-12"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/46/0d/0d/460d0d5ede9229397ad8b397b7ae1080.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Kiri: Form Login */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white p-10 rounded-xl shadow-xl w-full"
        >
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            Masuk ke I CLOUD JOB
          </h1>
          <p className="text-gray-600 mb-6 text-sm">
            Temukan pekerjaan impianmu hari ini.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Lupa kata sandi?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Masuk
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">atau</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <Link
            to="/register"
            className="w-full inline-block text-center border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition duration-300"
          >
            Daftar Akun Baru
          </Link>

          <p className="text-xs text-center text-gray-500 mt-6">
            Dengan masuk, kamu menyetujui{" "}
            <a href="#" className="underline hover:text-blue-600">
              Ketentuan
            </a>{" "}
            &{" "}
            <a href="#" className="underline hover:text-blue-600">
              Kebijakan Privasi
            </a>{" "}
            kami.
          </p>

          <Link
            to="/"
            className="block text-center mt-4 text-sm text-blue-600 hover:underline"
          >
            ← Kembali ke Halaman Utama
          </Link>
        </motion.div>

        {/* Kanan: Fitur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fiturItems.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-4 p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-300 group"
            >
              <div className="bg-blue-600 p-2 rounded-full">{item.icon}</div>
              <div>
                <p className="font-semibold text-gray-800 text-lg group-hover:text-blue-700">
                  {item.title}
                </p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
