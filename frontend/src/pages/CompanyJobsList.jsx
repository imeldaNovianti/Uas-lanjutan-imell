import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CompanyJobsList() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/company/jobs", {
        withCredentials: true,
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus lowongan ini?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/company/jobs/${id}`, {
        withCredentials: true,
      });
      setMessage("Lowongan berhasil dihapus.");
      fetchJobs();
    } catch (error) {
      console.error("Gagal menghapus:", error.message);
      setMessage("Gagal menghapus lowongan.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Lowongan Anda</h2>
      {message && <div className="text-sm bg-green-100 text-green-800 p-3 mb-4 rounded">{message}</div>}
      {jobs.length === 0 ? (
        <p>Belum ada lowongan.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="border p-4 rounded-md shadow-sm flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert("🔧 Halaman edit bisa kamu arahkan di sini")}
                  className="text-indigo-600 hover:text-indigo-800"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Hapus"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
