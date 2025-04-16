import { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Activity, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardCompany() {
  const [profile, setProfile] = useState({});
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

  useEffect(() => {
    fetchProfile();
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

      {/* Iklan */}
      <div className="bg-yellow-100 p-4 rounded-xl mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Iklan</h3>
        <p className="text-gray-700 mb-2">Temukan lebih banyak peluang kerja di situs kami!</p>
        <button
          onClick={() => navigate("/ads")}
          className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        >


        </button>
      </div>

      {/* Iklan Lainnya */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <Activity className="text-purple-600" /> Iklan di Platform Kami
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Iklan 1 */}
          <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <img src="https://i.pinimg.com/736x/19/93/77/1993772f7b7e4d4cbf04cbdf95d1af0e.jpg" alt="Iklan 1" className="rounded-lg mb-4 w-full h-32 object-cover" />
            <h4 className="font-semibold text-lg mb-2">Iklan Lowongan Pekerjaan A</h4>
            <p className="text-gray-600 mb-2">Bergabunglah dengan perusahaan global yang sedang berkembang pesat!</p>
          </div>

          {/* Iklan 2 */}
          <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <img src="https://i.pinimg.com/736x/c4/61/ce/c461ce34d6528ff2c2e3566bbe5a0bf6.jpg" alt="Iklan 2" className="rounded-lg mb-4 w-full h-32 object-cover" />
            <h4 className="font-semibold text-lg mb-2">Iklan Lowongan Pekerjaan B</h4>
            <p className="text-gray-600 mb-2">Karier baru yang menarik menunggu Anda! Klik untuk informasi lebih lanjut.</p>
          </div>

          {/* Iklan 3 */}
          <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <img src="https://i.pinimg.com/736x/91/b1/bf/91b1bf443737828460d93dce322d4a74.jpg" alt="Iklan 3" className="rounded-lg mb-4 w-full h-32 object-cover" />
            <h4 className="font-semibold text-lg mb-2">Iklan Lowongan Pekerjaan C</h4>
            <p className="text-gray-600 mb-2">Temukan peluang karier yang lebih baik di industri favorit Anda!</p>
          </div>

          {/* Iklan 4 */}
          <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <img src="https://i.pinimg.com/736x/f6/02/15/f60215e5180f327c254711416c401ecc.jpg" alt="Iklan 4" className="rounded-lg mb-4 w-full h-32 object-cover" />
            <h4 className="font-semibold text-lg mb-2">Iklan Lowongan Pekerjaan D</h4>
            <p className="text-gray-600 mb-2">Temukan peluang karier menarik untuk masa depan cerah Anda!</p>
          </div>

          {/* Iklan 5 */}
          <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <img src="https://i.pinimg.com/736x/b5/9f/57/b59f57f0bd6ebfabe75731f4b533804d.jpg" alt="Iklan 5" className="rounded-lg mb-4 w-full h-32 object-cover" />
            <h4 className="font-semibold text-lg mb-2">Iklan Lowongan Pekerjaan E</h4>
            <p className="text-gray-600 mb-2">Gabung bersama kami untuk mengejar peluang karier yang lebih baik!</p>
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
}
