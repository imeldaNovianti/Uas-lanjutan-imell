import Header from "../components/Header";
import Footer from "../components/Footer";
import { ShieldCheck, Lock, AlertCircle, ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PusatKeamanan() {
  const navigate = useNavigate();

  const info = [
    {
      icon: <ShieldCheck size={32} className="text-blue-600" />,
      title: "Perlindungan Data",
      description:
        "Kami menjaga data pribadi Anda dengan standar enkripsi tingkat tinggi dan sistem deteksi dini terhadap aktivitas mencurigakan."
    },
    {
      icon: <Lock size={32} className="text-green-600" />,
      title: "Login Aman",
      description:
        "Gunakan autentikasi dua faktor untuk melindungi akun Anda dari akses yang tidak sah. Kami terus memantau keamanan masuk Anda."
    },
    {
      icon: <AlertCircle size={32} className="text-red-600" />,
      title: "Laporan & Notifikasi",
      description:
        "Kami memberi notifikasi jika ada aktivitas mencurigakan dan menyediakan kanal pelaporan yang cepat dan responsif."
    }
  ];

  return (
    <>
      {/* <Header /> */}

      <section className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Banner */}
          <div className="relative w-full mb-12">
            <img
              src="https://i.pinimg.com/736x/4b/22/f2/4b22f26d504b414b242a4e1a456e48d2.jpg"
              alt="Banner Keamanan"
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex flex-col justify-center items-center text-white text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Pusat Keamanan I CLOUD JOB</h1>
              <p className="max-w-2xl text-lg">
                Kami berkomitmen untuk menciptakan lingkungan kerja yang aman, terpercaya, dan nyaman bagi seluruh pengguna.
              </p>
            </div>
          </div>

          {/* Informasi keamanan */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {info.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Iklan/banner tambahan */}
          <div className="bg-purple-100 rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center gap-6 mb-12">
            <img
              src="https://i.pinimg.com/736x/4b/22/f2/4b22f26d504b414b242a4e1a456e48d2.jpg"
              alt="Iklan keamanan"
              className="w-full md:w-1/3 rounded-lg object-cover shadow-md"
            />
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-2 text-purple-800">Lindungi Akunmu Hari Ini</h2>
              <p className="text-gray-700 mb-4">
                Aktifkan autentikasi dua faktor dan dapatkan notifikasi real-time setiap kali ada aktivitas login baru.
                Lindungi privasi dan data profesionalmu hanya dengan beberapa klik.
              </p>
              <button className="bg-purple-700 hover:bg-purple-900 text-white px-6 py-2 rounded-lg transition">
                Aktifkan Sekarang
              </button>
            </div>
          </div>

          {/* Tombol kembali */}
          <div className="text-center">
            <button
              onClick={() => navigate("/about")}
              className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-full transition-all duration-300 shadow"
            >
              <ArrowLeftCircle size={20} />
              Kembali ke Tentang
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
