import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Ambil semua lowongan
        const jobRes = await axios.get("http://localhost:4000/api/jobs", {
          withCredentials: true,
        });
        console.log("Job Response:", jobRes.data);
        setJobs(Array.isArray(jobRes.data.jobs) ? jobRes.data.jobs : jobRes.data);

        // Cek siapa yang login
        const meRes = await axios.get("http://localhost:4000/api/me", {
          withCredentials: true,
        });
        console.log("User Info:", meRes.data);
        setUserRole(meRes.data.role);

        // Jika pelamar, ambil lamaran
        if (meRes.data.role === "user") {
          const applicationRes = await axios.get("http://localhost:4000/api/applications", {
            withCredentials: true,
          });
          console.log("Application Response:", applicationRes.data);
          setApplications(
            Array.isArray(applicationRes.data.applications)
              ? applicationRes.data.applications
              : applicationRes.data
          );
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setUserRole(null); // Jika user tidak login
        }
      }
    };
    fetchAllJobs();
  }, []);

  const isApplied = (jobId) => {
    return applications.some((application) => application.job_id === jobId);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/jobs/delete/${jobId}`,
        { withCredentials: true }
      );
      alert(response.data.message);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error("Gagal menghapus lowongan:", error);
    }
  };

  const handleEditJob = (jobId) => {
    navigate(`/company/edit-job/${jobId}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Lowongan Pekerjaan</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center italic">Belum ada lowongan tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-blue-600">{job.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{job.location || "Lokasi tidak tersedia"}</p>
              <p className="text-sm text-gray-500">{job.salary || "Gaji tidak disebutkan"}</p>
              <p className="text-sm text-gray-400 mt-2">{new Date(job.created_at).toLocaleDateString()}</p>
              <p className="mt-4 text-gray-700">{job.description}</p>

              <div className="mt-6 space-x-4">
                {userRole === "user" && (
                  <>
                    {isApplied(job.id) ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out cursor-not-allowed"
                      >
                        Sudah Melamar
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
                      >
                        Melamar
                      </button>
                    )}
                  </>
                )}

                {userRole === "company" && (
                  <>
                    <button
                      onClick={() => handleEditJob(job.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out"
                    >
                      Edit Lowongan
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                      Hapus Lowongan
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
