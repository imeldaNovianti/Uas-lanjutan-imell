import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeftCircle } from "lucide-react";
import axios from "axios";  // Pastikan Axios di-import

export default function LamarPekerjaan() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("❗ Silakan unggah CV Anda terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file); // 'cv' adalah nama field untuk file di backend

    try {
      const response = await axios.post(
        `http://localhost:4000/api/applications/${id}`,  // Sesuaikan URL dengan endpoint backend
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",  // Pastikan header untuk file upload
          },
        }
      );

      if (response.data.success) {
        setMessage("✅ CV berhasil diunggah! Kami akan menghubungi Anda.");
      } else {
        setMessage("❗ Terjadi kesalahan saat mengunggah CV.");
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      setMessage("❗ Gagal mengunggah CV. Coba lagi.");
    }

    setFile(null); // Reset file setelah submit
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-blue-100/80 to-indigo-100/90 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center bg-indigo-100">
          <img
            src="https://i.pinimg.com/736x/d1/b9/9d/d1b99d267557829c30c24afa1266332c.jpg"
            alt="Job Application"
            className="w-4/5 rounded-xl"
          />
        </div>

        <div className="p-10">
          <Link
            to="/jobs"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition"
          >
            <ArrowLeftCircle className="mr-2" />
            <span>Kembali ke Daftar Pekerjaan</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-4">
            Lamar Pekerjaan
          </h1>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-indigo-600">Frontend Developer</h2>
            <p className="text-gray-500">PT. Teknologi Masa Depan • Jakarta</p>
            <p className="text-sm text-gray-400 mt-1">ID Lowongan: #{id}</p>
          </div>

          <p className="text-gray-600 mb-6 text-center">
            Silakan unggah CV Anda (PDF / DOC / Gambar) untuk melamar posisi ini.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Upload CV</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-4 bg-gray-50 focus:outline-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Kirim CV Sekarang
            </button>
          </form>

          {message && (
            <div className="mt-6 text-center text-lg font-medium text-green-600">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
