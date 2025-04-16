import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditJobPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID lowongan pekerjaan dari URL
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mengambil data lowongan berdasarkan ID dari backend
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/jobs/${id}`,
          { withCredentials: true }
        );
        setJob(response.data.job);
      } catch (err) {
        setError("Gagal mengambil data lowongan.");
      }
    };
    fetchJob();
  }, [id]);

  // Menghandle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  // Menyimpan perubahan lowongan pekerjaan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:4000/api/jobs/update/${id}`,
        job,
        { withCredentials: true }
      );
      alert("Lowongan berhasil diperbarui!");
      navigate("/company/all-jobs"); // Kembali ke halaman semua lowongan
    } catch (err) {
      setLoading(false);
      setError("Gagal memperbarui lowongan.");
      console.error("Error updating job:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Edit Lowongan
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label htmlFor="title" className="text-lg text-gray-700">
            Judul Lowongan
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-lg text-gray-700">
            Deskripsi Lowongan
          </label>
          <textarea
            id="description"
            name="description"
            value={job.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-lg text-gray-700">
            Lokasi
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="salary" className="text-lg text-gray-700">
            Gaji
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Perbarui Lowongan"}
          </button>
          <button
            onClick={() => navigate("/company/all-jobs")}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
