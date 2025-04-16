import { useEffect, useState } from "react";
import axios from "axios";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]); // Untuk menyimpan data lamaran pelamar

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Ambil data lowongan pekerjaan
        const jobRes = await axios.get("http://localhost:4000/api/all-jobs");
        setJobs(jobRes.data.jobs || []);

        // Ambil data lamaran pekerjaan dari backend
        const applicationRes = await axios.get("http://localhost:4000/api/applications"); 
        setApplications(applicationRes.data.applications || []);
        
      } catch (err) {
        console.error("Gagal mengambil semua lowongan atau lamaran:", err);
      }
    };
    fetchAllJobs();
  }, []);

  // Fungsi untuk mengecek apakah pelamar sudah melamar lowongan ini
  const isApplied = (jobId) => {
    return applications.some((application) => application.job_id === jobId);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Semua Lowongan</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.Company?.company_name}</p>
            <p className="text-gray-700">{job.description}</p>

            {/* Menampilkan status apakah pelamar sudah melamar */}
            {isApplied(job.id) ? (
              <p className="text-sm text-green-500">Sudah Melamar</p>
            ) : (
              <p className="text-sm text-red-500">Belum Melamar</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
