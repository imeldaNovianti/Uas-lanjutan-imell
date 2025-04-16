import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

export default function CompanyPostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!title || !description || !location || !type || !salary) {
      setMessage("Mohon lengkapi semua data.");
      return;
    }

    // Validasi agar salary berupa angka dan tidak kosong
    if (isNaN(salary) || salary.trim() === "") {
      setMessage("Gaji harus berupa angka.");
      return;
    }

    setLoading(true);

    // Log data yang akan dikirim
    console.log({
      title,
      description,
      location,
      type,
      salary: parseInt(salary),
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/company/jobs", // Endpoint yang sesuai dengan backend
        {
          title,
          description,
          location,
          type,
          salary: parseInt(salary), // Kirim salary sebagai angka
        },
        {
          withCredentials: true, // Kirim cookie jika autentikasi ada
        }
      );

      setMessage(`Lowongan berhasil diposting! ID: ${response.data.id}`);
      setTitle("");
      setDescription("");
      setLocation("");
      setType("");
      setSalary("");
    } catch (error) {
      console.error("Error posting job:", error);
      const errorMsg =
        error.response?.data?.error || error.message || "Gagal memposting lowongan.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl text-gray-900">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <FaPlus className="text-indigo-600" /> Posting Lowongan Baru
        </h2>

        {message && (
          <div className="mb-4 p-3 bg-indigo-100 text-indigo-800 rounded-md text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Judul Pekerjaan</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Frontend Developer"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan deskripsi pekerjaan"
              className="w-full h-32 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Lokasi</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tipe</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              >
                <option value="">Pilih tipe</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Gaji</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 hover:scale-105 transition-transform duration-300"
            disabled={loading}
          >
            {loading ? "Posting..." : "Posting"}
          </button>
        </form>
      </div>
    </div>
  );
}
