import { useNavigate } from "react-router-dom";

export default function LandingPages() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1470&q=80')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-white px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
          Selamat Datang di <span className="text-yellow-300">Portal Lowongan Kerja</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-200">
          Temukan karier impianmu atau temukan talenta terbaik untuk perusahaanmu. Mudah, cepat, dan terpercaya.
        </p>

        {/* Tombol Akses */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition shadow-md hover:scale-105"
          >
            Login sebagai Pelamar
          </button>
          <button
            onClick={() => navigate("/company/login")}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition shadow-md hover:scale-105"
          >
            Login sebagai Company
          </button>
        </div>

        {/* Promo / Slogan */}
        <div className="mt-16 bg-white/10 p-6 rounded-xl backdrop-blur-sm shadow-lg max-w-xl">
          <h2 className="text-2xl font-bold text-yellow-300 mb-2">🔥 Mengapa memilih kami?</h2>
          <ul className="text-left text-gray-100 space-y-2 text-sm md:text-base">
            <li>✅ Ribuan lowongan dari perusahaan top</li>
            <li>✅ Proses cepat dan transparan</li>
            <li>✅ Dashboard interaktif untuk pelamar & perusahaan</li>
            <li>✅ 100% gratis untuk pelamar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
