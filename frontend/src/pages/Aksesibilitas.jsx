import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Aksesibilitas() {
  return (
    <>
      {/* <Header /> */}

      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Komitmen Aksesibilitas</h1>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Di I CLOUD JOB, kami percaya bahwa aksesibilitas digital adalah hak semua orang. Kami berkomitmen untuk memastikan bahwa platform kami dapat diakses oleh semua pengguna, termasuk mereka yang memiliki disabilitas. Tujuan kami adalah menciptakan pengalaman yang setara, inklusif, dan memberdayakan bagi setiap pencari kerja dan perekrut.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Standar Aksesibilitas</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Kami terus berupaya mematuhi Pedoman Aksesibilitas Konten Web (WCAG) 2.1 tingkat AA sebagai referensi utama dalam pengembangan platform. Kami menggunakan berbagai teknologi bantu seperti pembaca layar (screen reader), navigasi keyboard, dan kontras tinggi untuk memastikan kenyamanan pengguna.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Fitur Aksesibilitas Utama</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Navigasi yang ramah keyboard</li>
            <li>Label elemen form yang jelas dan konsisten</li>
            <li>Teks alternatif (alt) pada semua gambar penting</li>
            <li>Kontras warna tinggi untuk visibilitas yang lebih baik</li>
            <li>Struktur heading yang semantik</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Umpan Balik</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Kami menyambut segala bentuk masukan mengenai pengalaman aksesibilitas Anda. Jika Anda mengalami kesulitan mengakses fitur tertentu di platform kami, silakan hubungi kami melalui:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
            <li>Email: <a href="mailto:akses@icloudjob.com" className="text-blue-600 underline">akses@icloudjob.com</a></li>
            <li>Telepon: 0800-123-456 (khusus aksesibilitas)</li>
            <li>Live Chat: Tersedia di Senin–Jumat pukul 09.00–17.00 WIB</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Peningkatan Berkelanjutan</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Kami terus memperbarui dan meningkatkan fitur aksesibilitas di platform I CLOUD JOB melalui audit berkala, pelatihan tim, serta kolaborasi dengan komunitas disabilitas. Komitmen kami adalah memberikan ruang kerja digital yang terbuka bagi semua kalangan.
          </p>

          <div className="mt-8">
            <Link
              to="/about"
              className="text-blue-600 hover:underline font-medium"
            >
              ← Kembali ke halaman Tentang
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
