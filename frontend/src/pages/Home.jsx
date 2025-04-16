import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // Import framer-motion untuk animasi
import Footer from "../components/Footer";

export default function Home() {
  const recommendations = [
    { title: "Frontend Developer di Jakarta", company: "TechNova", type: "Full Time" },
    { title: "Digital Marketing Specialist", company: "MarketWise", type: "Remote" },
    { title: "UI/UX Designer - Hybrid", company: "CreativeHub", type: "Hybrid" },
    { title: "Backend Engineer Golang", company: "FinSync", type: "Full Time" },
    { title: "Customer Support (Remote)", company: "Helpster", type: "Remote" },
  ];

  const ads = [
    {
      title: "Kembangkan kariermu dengan kursus online!",
      image: "https://i.pinimg.com/736x/e9/19/75/e91975aa0af09b0767f754765839a300.jpg"
    },
    {
      title: "Rekrut kandidat terbaik di I CLOUD JOB",
      image: "https://i.pinimg.com/736x/e1/c1/56/e1c156223f1a32a0b0a445157998c27e.jpg"
    },
    {
      title: "Upgrade CV-mu dengan desain profesional",
      image: "https://i.pinimg.com/736x/b2/87/7d/b2877db277624b6b762d82fa7dc05a51.jpg"
    },
    {
      title: "Tips wawancara kerja sukses dari HR",
      image: "https://i.pinimg.com/736x/2c/18/aa/2c18aac8748c0a76b0b5fa69cc2d957d.jpg"
    },
    {
      title: "Bangun portofolio dengan proyek nyata",
      image: "src/assets/11.jpg"
    },
    {
      title: "Kenali tren teknologi terbaru 2025",
      image: "src/assets/1.jpg"
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-white via-blue-200 to-pink-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6">
          {/* Sidebar Kiri - Iklan */}
          <aside className="space-y-4 col-span-1">
            {ads.slice(0, 3).map((ad, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.3 }}
              >
                <img src={ad.image} alt={ad.title} className="w-full h-auto rounded-md mb-2" />
                <p className="font-semibold text-gray-800 text-sm">{ad.title}</p>
              </motion.div>
            ))}
          </aside>

          {/* Konten Tengah */}
          <main className="space-y-6 col-span-1">
            {/* Notifikasi kerja */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-4 hover:bg-blue-50 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-semibold text-gray-800 mb-2">Siapkan pencarian kerja Anda</h2>
              <p className="text-sm text-gray-600 mb-3">
                Dapatkan notifikasi ketika ada posting pekerjaan baru yang cocok dengan posisi dan lokasi Anda.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-full transition-transform transform hover:scale-105">
                Buat pemberitahuan pekerjaan
              </button>
            </motion.div>

            {/* Post singkat */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:bg-gray-50 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="Mulai buat posting"
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none bg-gray-100"
              />
            </motion.div>

            {/* Rekomendasi Pekerjaan */}
            <motion.div 
              className="bg-white p-4 rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-semibold text-gray-800 text-lg mb-4">Rekomendasi Pekerjaan</h2>
              {recommendations.map((job, index) => (
                <motion.div
                  key={index}
                  className="border-b py-3 flex justify-between items-center hover:bg-blue-50 px-2 rounded-md hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05, backgroundColor: "#ebf8ff" }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <p className="font-medium text-blue-700">{job.title}</p>
                    <p className="text-sm text-gray-500">
                      {job.company} • {job.type}
                    </p>
                  </div>
                  <Link to="/jobs" className="text-blue-500 hover:underline">
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Akses Fitur Pelamar */}
            <motion.div 
              className=" bg-gray-100 text-gray-800 text-sm hover:bg-blue-100 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-semibold text-lg mb-2">Ayo, Mulai Pencarian Kariermu!</h2>
              <p className="text-sm mb-3">Masukkan informasi pekerjaan yang kamu minati dan mulai lamar pekerjaan yang sesuai.</p>
              <Link to="/pelamar" className="bg-white text-blue-600 px-6 py-2 text-sm rounded-full hover:bg-gray-100 transition">
                Masuk ke Fitur Pelamar
              </Link>
            </motion.div>
          </main>

          {/* Sidebar Kanan - Iklan tambahan */}
          <aside className="space-y-4 col-span-1">
            {ads.slice(3).map((ad, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.3 }}
              >
                <img src={ad.image} alt={ad.title} className="w-full h-auto rounded-md mb-2" />
                <p className="font-semibold text-gray-800 text-sm">{ad.title}</p>
              </motion.div>
            ))}
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
