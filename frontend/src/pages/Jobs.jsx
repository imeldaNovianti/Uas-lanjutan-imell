import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Declare useNavigate hook

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/public/jobs");
        setJobs(res.data);
        setFilteredJobs(sortAndFilter(res.data, searchTerm, sortOption));
      } catch (error) {
        console.error("Gagal mengambil data lowongan:", error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    setFilteredJobs(sortAndFilter(jobs, searchTerm, sortOption));
  }, [searchTerm, sortOption]);

  const sortAndFilter = (jobs, searchTerm, sortOption) => {
    const keyword = searchTerm.toLowerCase();
    let result = jobs.filter((job) =>
      job.title.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword) ||
      job.Company?.company_name.toLowerCase().includes(keyword)
    );
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "companyAZ":
        result.sort((a, b) =>
          a.Company?.company_name.localeCompare(b.Company?.company_name)
        );
        break;
      case "locationAZ":
        result.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        break;
    }
    return result;
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const applyJob = (jobId) => {
    // Arahkan ke halaman LamarPekerjaan menggunakan useNavigate
    navigate(`/lamar/${jobId}`);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Lowongan Pekerjaan</h1>
          <p className="text-lg text-gray-600 mb-8">
            Temukan peluang kerja yang sesuai dengan keahlian dan minatmu.
          </p>

          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full md:max-w-xl">
              <Search className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Cari jabatan, perusahaan, lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 w-full focus:outline-none text-gray-800"
              />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-full px-4 py-2 bg-white shadow-md border border-gray-300 text-gray-800 w-full md:w-auto"
            >
              <option value="newest">Terbaru</option>
              <option value="companyAZ">Nama Perusahaan A-Z</option>
              <option value="locationAZ">Lokasi A-Z</option>
            </select>
          </div>

          {/* Job List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => openModal(job)}
                  className="cursor-pointer bg-white bg-opacity-70 rounded-xl shadow-md p-6 flex gap-5 flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-purple-100 hover:shadow-xl hover:scale-[1.03] transition duration-300"
                >
                  <div className="flex gap-4 items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                      <p className="text-gray-600">
                        {job.Company?.company_name} • {job.location}
                      </p>
                      <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full mt-2 inline-block">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center justify-between">
                    <button
                      onClick={() => applyJob(job.id)}
                      className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => openModal(job)}
                      className="bg-transparent border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-100 transition"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">Tidak ada lowongan ditemukan.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 max-w-4xl w-full rounded-xl shadow-lg p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <div className="flex gap-4 items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedJob.title}</h2>
                <p className="text-gray-600">{selectedJob.Company?.company_name} • {selectedJob.location}</p>
                <p className="text-sm mt-1 bg-purple-100 text-purple-600 px-3 py-1 inline-block rounded-full">
                  {selectedJob.type}
                </p>
              </div>
            </div>
            <div className="text-gray-700 space-y-4">
              <p><strong>Deskripsi:</strong></p>
              <p className="whitespace-pre-line">{selectedJob.description}</p>
              <p><strong>Gaji:</strong> {selectedJob.salary ? `Rp ${selectedJob.salary}` : "Tidak disebutkan"}</p>
              <p><strong>Dibuat pada:</strong> {new Date(selectedJob.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
