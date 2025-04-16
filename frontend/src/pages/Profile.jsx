import { useEffect, useState } from "react";
import {
  Edit,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Trash2,
} from "lucide-react";
import Footer from "../components/Footer";

export default function Profile() {
  const [user, setUser] = useState({});
  const [experienceList, setExperienceList] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profile_picture: "",
  });
  const [experienceForm, setExperienceForm] = useState({
    position: "",
    company: "",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("accessToken");

  // Ambil data user saat login
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal ambil data user");
      const data = await res.json();
      setUser(data);
      setFormData({
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        bio: data.bio || "",
        profile_picture: data.profile_picture || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Update profil
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Gagal update profil");
      fetchProfile();
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      console.error(err.message);
      alert("Gagal update profil.");
    }
  };

  // Fetch pengalaman kerja
  const fetchExperience = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile/experience", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setExperienceList(data);
      } else {
        setExperienceList([]);
        setErrorMessage("Data pengalaman tidak valid.");
      }
    } catch (err) {
      console.error("Gagal mengambil pengalaman:", err.message);
      setErrorMessage("Gagal memuat data pengalaman.");
    }
  };

  const handleExpChange = (e) => {
    setExperienceForm({ ...experienceForm, [e.target.name]: e.target.value });
  };

  const handleExpSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:3000/api/profile/experience/${editingId}`
      : "http://localhost:3000/api/profile/experience";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experienceForm),
      });

      if (!res.ok) throw new Error("Gagal simpan pengalaman");

      setExperienceForm({
        position: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        description: "",
      });
      setEditingId(null);
      fetchExperience();
    } catch (err) {
      console.error(err.message);
      alert("Gagal menyimpan data pengalaman.");
    }
  };

  const handleExpEdit = (exp) => {
    setExperienceForm(exp);
    setEditingId(exp.id);
  };

  const handleExpDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/profile/experience/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Gagal hapus pengalaman");

      fetchExperience();
    } catch (err) {
      console.error(err.message);
      alert("Gagal menghapus data.");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchExperience();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <main className="flex-grow px-6 py-12 max-w-5xl mx-auto space-y-10">

        {/* Data Profil */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">Profil Saya</h2>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <input type="text" name="full_name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} placeholder="Nama Lengkap" className="w-full border p-2 rounded" required />
            <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full border p-2 rounded" required />
            <input type="text" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Telepon" className="w-full border p-2 rounded" />
            <input type="text" name="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Lokasi" className="w-full border p-2 rounded" />
            <textarea name="bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tentang Saya" className="w-full border p-2 rounded"></textarea>
            <input type="text" name="profile_picture" value={formData.profile_picture} onChange={(e) => setFormData({ ...formData, profile_picture: e.target.value })} placeholder="URL Foto Profil (opsional)" className="w-full border p-2 rounded" />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Update Profil
            </button>
          </form>
        </div>

        {/* Pengalaman Kerja */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-lg font-semibold text-blue-700">Pengalaman Kerja</h2>

          <form onSubmit={handleExpSubmit} className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input name="position" value={experienceForm.position} onChange={handleExpChange} placeholder="Posisi" className="border p-2 rounded" required />
              <input name="company" value={experienceForm.company} onChange={handleExpChange} placeholder="Perusahaan" className="border p-2 rounded" required />
              <input name="location" value={experienceForm.location} onChange={handleExpChange} placeholder="Lokasi" className="border p-2 rounded" />
              <input name="start_date" type="date" value={experienceForm.start_date} onChange={handleExpChange} className="border p-2 rounded" required />
              <input name="end_date" type="date" value={experienceForm.end_date} onChange={handleExpChange} className="border p-2 rounded" />
            </div>
            <textarea name="description" value={experienceForm.description} onChange={handleExpChange} placeholder="Deskripsi" className="w-full border p-2 rounded"></textarea>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {editingId ? "Update" : "Tambah"} Pengalaman
            </button>
          </form>

          {experienceList.length > 0 ? (
            experienceList.map((exp) => (
              <div key={exp.id} className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      <Briefcase className="inline mr-2" size={18} /> {exp.position} - {exp.company}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {exp.start_date} - {exp.end_date} | {exp.location}
                    </p>
                    <p className="text-gray-700 mt-1">{exp.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleExpEdit(exp)} className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleExpDelete(exp.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada pengalaman kerja ditambahkan.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
