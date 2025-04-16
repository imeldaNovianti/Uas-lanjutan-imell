import { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Users,
  FileText,
  XCircle,
  PlusCircle,
  Activity,
  Settings,
  ClipboardList
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardCompany() {
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/company/profile", {
        withCredentials: true
      });
      setProfile(res.data || {});
    } catch (err) {
      console.error("Gagal mengambil profil:", err.response?.data || err.message);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/company/jobs", {
        withCredentials: true
      });

      // Cek apakah data langsung berupa array atau objek dengan key "jobs"
      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else if (Array.isArray(res.data.jobs)) {
        setJobs(res.data.jobs);
      } else {
        setJobs([]);
        console.warn("Data lowongan tidak dalam format array:", res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil lowongan:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus lowongan ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/company/jobs/${id}`, {
        withCredentials: true
      });
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Gagal menghapus lowongan:", err.response?.data || err.message);
      alert("Terjadi kesalahan saat menghapus lowongan.");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchJobs();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Dashboard Perusahaan</h2>

      {/* Profil Perusahaan */}
      <div className="bg-white shadow-md p-6 rounded-2xl mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Briefcase className="text-blue-600" /> Profil Perusahaan
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <p><strong>Nama:</strong> {profile.company_name || 'PT Contoh Sejahtera'}</p>
          <p><strong>Email:</strong> {profile.email || 'company@example.com'}</p>
          <p><strong>Industri:</strong> {profile.industri || 'Teknologi'}</p>
          <p><strong>Lokasi:</strong> {profile.lokasi || 'Jakarta, Indonesia'}</p>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Lowongan Aktif", count: jobs?.length || 0, color: "text-blue-700", icon: <FileText /> },
          { label: "Total Pelamar", count: 120, color: "text-green-700", icon: <Users /> },
          { label: "Interview Berlangsung", count: 3, color: "text-yellow-600", icon: <ClipboardList /> },
          { label: "Ditolak", count: 2, color: "text-red-500", icon: <XCircle /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow hover:shadow-lg text-center transition duration-300 hover:scale-[1.03]">
            <div className="flex justify-center mb-2 text-2xl">{stat.icon}</div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Aksi Cepat */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <Activity className="text-purple-600" /> Aksi Cepat
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/company/post-job")}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl shadow hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <PlusCircle /> Posting Lowongan
          </button>
          <button
            onClick={() => navigate("/company/applicants")}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl shadow hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <Users /> Lihat Pelamar
          </button>
          <button
            onClick={() => navigate("/company/edit-profile")}
            className="bg-gradient-to-r from-gray-500 to-gray-700 text-white py-3 rounded-xl shadow hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <Settings /> Edit Profil
          </button>
        </div>
      </div>

      {/* Daftar Lowongan */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <FileText className="text-gray-700" /> Lowongan Anda
        </h3>
        {loading ? (
          <p className="text-gray-600 italic">Memuat data lowongan...</p>
        ) : jobs?.length === 0 ? (
          <p className="text-gray-600 italic">Belum ada lowongan yang diposting.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border p-5 rounded-xl bg-white shadow hover:shadow-md transition hover:scale-[1.01]">
                <div className="flex justify-between items-start flex-col md:flex-row">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{job.judul}</h4>
                    <p className="text-sm text-gray-600">{job.lokasi} - {job.tipe}</p>
                    <p className="mt-2 text-gray-700 line-clamp-2">{job.deskripsi}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => navigate(`/company/edit-job/${job.id}`)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 hover:scale-105 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 hover:scale-105 transition flex items-center gap-1"
                    >
                      <XCircle size={18} /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
