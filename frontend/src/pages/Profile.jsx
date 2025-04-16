import { useEffect, useState } from "react";
import { Edit, Trash2, Briefcase, BadgeCheck, Star, Award, Megaphone } from "lucide-react";
import Footer from "../components/Footer";

export default function Profile() {
  const [user, setUser] = useState({
    full_name: "Imelda Sukses",
    email: "imelda@mail.com",
    phone: "08123456789",
    location: "Jakarta",
    bio: "Saya adalah seorang web developer dengan minat besar di bidang frontend dan UX design. Aktif membangun aplikasi modern dengan React dan Tailwind.",
  });

  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      position: "Frontend Developer",
      company: "PT Teknologi Hebat",
      location: "Jakarta",
      start_date: "2022-01-01",
      end_date: "2023-06-30",
      description: "Membangun dan mengelola UI aplikasi menggunakan React dan Tailwind.",
    },
    {
      id: 2,
      position: "UI/UX Designer",
      company: "StartupKita",
      location: "Remote",
      start_date: "2021-03-01",
      end_date: "2021-12-31",
      description: "Mendesain pengalaman pengguna dan antarmuka aplikasi mobile dan web.",
    },
  ]);

  const [formData, setFormData] = useState({ ...user });

  const [experienceForm, setExperienceForm] = useState({
    position: "",
    company: "",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const skills = ["React.js", "Tailwind CSS", "Node.js", "Figma", "REST API"];
  const certifications = [
    "Dicoding: Belajar Dasar Pemrograman Web",
    "Coursera: Full-Stack Web Development",
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, []);

  useEffect(() => {
    const storedExperienceList = JSON.parse(localStorage.getItem("experienceList"));
    if (storedExperienceList) {
      setExperienceList(storedExperienceList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("experienceList", JSON.stringify(experienceList));
  }, [experienceList]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    alert("Profil berhasil diperbarui!");
  };

  const handleExpChange = (e) => {
    setExperienceForm({ ...experienceForm, [e.target.name]: e.target.value });
  };

  const handleExpSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setExperienceList(
        experienceList.map((exp) =>
          exp.id === editingId ? { ...exp, ...experienceForm } : exp
        )
      );
    } else {
      setExperienceList([
        ...experienceList,
        { id: Date.now(), ...experienceForm },
      ]);
    }

    setExperienceForm({
      position: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
    });
    setEditingId(null);
    alert("Pengalaman berhasil diperbarui!");
  };

  const handleExpEdit = (exp) => {
    setExperienceForm(exp);
    setEditingId(exp.id);
  };

  const handleExpDelete = (id) => {
    setExperienceList(experienceList.filter((exp) => exp.id !== id));
    alert("Pengalaman berhasil dihapus!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div
        className="bg-cover bg-center py-12 px-4 sm:px-8"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?office,workspace')",
        }}
      >
        <main className="flex-grow max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white bg-opacity-90 rounded-xl p-8 shadow-lg">
          {/* Konten Kiri (Profil & Pengalaman) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Profil Saya */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-blue-700">👩‍💻 Profil Saya</h2>

              <div>
                <h3 className="text-xl font-bold text-gray-800">{user.full_name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Nama Lengkap"
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Telepon"
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Lokasi"
                  className="w-full border p-3 rounded-lg"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tentang Saya"
                  className="w-full border p-3 rounded-lg"
                ></textarea>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
                >
                  Update Profil
                </button>
              </form>
            </section>

            {/* Pengalaman Kerja */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-blue-700">💼 Pengalaman Kerja</h2>
              <form onSubmit={handleExpSubmit} className="space-y-4">
                <input name="position" value={experienceForm.position} onChange={handleExpChange} placeholder="Posisi" className="w-full border p-3 rounded-lg" required />
                <input name="company" value={experienceForm.company} onChange={handleExpChange} placeholder="Perusahaan" className="w-full border p-3 rounded-lg" required />
                <input name="location" value={experienceForm.location} onChange={handleExpChange} placeholder="Lokasi" className="w-full border p-3 rounded-lg" />
                <input name="start_date" type="date" value={experienceForm.start_date} onChange={handleExpChange} className="w-full border p-3 rounded-lg" required />
                <input name="end_date" type="date" value={experienceForm.end_date} onChange={handleExpChange} className="w-full border p-3 rounded-lg" />
                <textarea name="description" value={experienceForm.description} onChange={handleExpChange} placeholder="Deskripsi" className="w-full border p-3 rounded-lg" />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
                  {editingId ? "Update" : "Tambah"} Pengalaman
                </button>
              </form>

              {experienceList.map((exp) => (
                <div key={exp.id} className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        <Briefcase className="inline mr-2" size={18} />
                        {exp.position} - {exp.company}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exp.start_date} - {exp.end_date || "Sekarang"}
                      </p>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleExpEdit(exp)}>
                        <Edit className="text-blue-600 hover:text-blue-700" size={18} />
                      </button>
                      <button onClick={() => handleExpDelete(exp.id)}>
                        <Trash2 className="text-red-600 hover:text-red-700" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar kanan */}
          <aside className="space-y-6">
            {/* Keahlian */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">🧠 Keahlian</h3>
              <ul className="space-y-2">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-800">
                    <Star size={16} className="text-yellow-500" /> {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sertifikasi */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">🎓 Sertifikasi</h3>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-800">
                    <Award size={16} className="text-green-500" /> {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Iklan / Promo */}
            <div className="bg-yellow-100 p-4 rounded-lg shadow-inner flex items-center gap-4">
              <Megaphone className="text-yellow-600" size={24} />
              <div>
                <p className="font-bold text-yellow-800">Ingin profilmu lebih menonjol?</p>
                <p className="text-sm text-yellow-700">Upgrade ke akun premium sekarang!</p>
              </div>
            </div>
          </aside>
        </main>
      </div>

      <Footer />
    </div>
  );
}
