import { FaUserTie } from "react-icons/fa";

export default function CompanyApplicants() {
  const dummyApplicants = [
    { name: "Budi Santoso", email: "budi@example.com", job: "Frontend Developer" },
    { name: "Siti Aminah", email: "siti@example.com", job: "Backend Developer" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
          <FaUserTie className="text-yellow-500" /> Daftar Pelamar
        </h2>

        <div className="grid gap-6">
          {dummyApplicants.map((applicant, index) => (
            <div
              key={index}
              className="bg-white hover:bg-gray-50 transition duration-300 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800">{applicant.name}</h3>
              <p className="text-sm text-gray-600">{applicant.email}</p>
              <p className="mt-2 text-sm italic text-gray-700">
                Melamar sebagai: <span className="font-medium text-blue-700">{applicant.job}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
