import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; // Hapus Header karena sudah ada di App.jsx
import { motion } from "framer-motion";

export default function About() {
  const navigate = useNavigate();

  const images = [
    { src: "src/assets/1.jpg", caption: "aksesibilitas" },
    { src: "src/assets/2.jpg", caption: "pusat keamanan" },
    { src: "src/assets/3.jpg", caption: "Diskusi proyek oleh developer" },
    { src: "src/assets/4.jpg", caption: "Wawancara kerja di lingkungan profesional" },
    { src: "src/assets/5.jpg", caption: "Tim pemasaran menyusun strategi" },
    { src: "src/assets/6.jpg", caption: "Lingkungan kerja startup modern" },
    { src: "src/assets/7.jpg", caption: "Rapat online jarak jauh" },
    { src: "src/assets/8.jpg", caption: "Suasana kerja fleksibel dan nyaman" },
    { src: "src/assets/9.jpg", caption: "Kegiatan pelatihan untuk pengembangan diri" },
    { src: "src/assets/10.jpg", caption: "Kerjasama tim antar departemen" }
  ];

  // Navigasi berdasarkan caption gambar
  const handleImageClick = (caption) => {
    const routes = {
      "aksesibilitas": "/aksesibilitas",
      "pusat keamanan": "/pusat-keamanan"
    };

    const path = routes[caption.toLowerCase()];
    if (path) {
      navigate(path);
    }
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Tentang I CLOUD JOB</h1>
          <p className="text-lg leading-relaxed text-center mb-12">
            I CLOUD JOB adalah portal lowongan kerja yang dirancang untuk membantu pencari kerja dan perusahaan
            saling terhubung dengan mudah dan efisien. Temukan pekerjaan impianmu atau pasang lowongan terbaikmu di sini!
          </p>

          {/* Galeri Gambar dengan animasi */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {images.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform transition duration-500 hover:scale-105 cursor-pointer"
                onClick={() => handleImageClick(item.caption)}
              >
                <img
                  src={item.src}
                  alt={`about-${index}`}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-center font-semibold text-gray-700">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
