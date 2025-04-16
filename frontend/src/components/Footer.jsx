// src/components/Footer.jsx
import {
  Users,
  HelpCircle,
  Info,
  Newspaper,
  Briefcase,
  School,
  Search,
  TrendingUp,
  LayoutDashboard,
  Smartphone
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-200 via-pink-200 to-yellow-100 text-black mt-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Umum */}
        <div>
          <h2 className="font-bold mb-4 text-lg">Umum</h2>
          <ul className="space-y-2 text-sm">
            <FooterItem icon={<Users size={16} />} text="Daftar" />
            <FooterItem icon={<HelpCircle size={16} />} text="Pusat Bantuan" />
            <FooterItem icon={<Info size={16} />} text="Tentang" />
            <FooterItem icon={<Newspaper size={16} />} text="Pers" />
            <FooterItem icon={<Briefcase size={16} />} text="Karier" />
            <FooterItem icon={<School size={16} />} text="Pengembang" />
          </ul>
        </div>

        {/* Telusuri */}
        <div>
          <h2 className="font-bold mb-4 text-lg">Telusuri</h2>
          <ul className="space-y-2 text-sm">
            <FooterItem icon={<School size={16} />} text="Learning" />
            <FooterItem icon={<Briefcase size={16} />} text="Pekerjaan" />
            <FooterItem icon={<TrendingUp size={16} />} text="Gaji" />
            <FooterItem icon={<Smartphone size={16} />} text="Ponsel" />
            <FooterItem icon={<LayoutDashboard size={16} />} text="Layanan" />
          </ul>
        </div>

        {/* Produk Bisnis */}
        <div>
          <h2 className="font-bold mb-4 text-lg">Produk Bisnis</h2>
          <ul className="space-y-2 text-sm">
            <FooterItem icon={<Users size={16} />} text="Bakat" />
            <FooterItem icon={<TrendingUp size={16} />} text="Pemasaran" />
            <FooterItem icon={<Briefcase size={16} />} text="Penjualan" />
            <FooterItem icon={<School size={16} />} text="Learning" />
          </ul>
        </div>

        {/* Direktori */}
        <div>
          <h2 className="font-bold mb-4 text-lg">Direktori</h2>
          <ul className="space-y-2 text-sm">
            <FooterItem icon={<Users size={16} />} text="Anggota" />
            <FooterItem icon={<Briefcase size={16} />} text="Pekerjaan" />
            <FooterItem icon={<LayoutDashboard size={16} />} text="Perusahaan" />
            <FooterItem icon={<Newspaper size={16} />} text="Artikel" />
            <FooterItem icon={<School size={16} />} text="Sekolah" />
            <FooterItem icon={<Search size={16} />} text="Pencarian Orang" />
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 py-4 text-center text-xs text-gray-800 mt-12">
        <p>© {new Date().getFullYear()} I CLOUD JOB By Imelda. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FooterItem({ icon, text }) {
  return (
    <li className="flex items-center space-x-2 hover:translate-x-1 hover:text-indigo-600 transition-all duration-200 cursor-pointer">
      {icon}
      <span>{text}</span>
    </li>
  );
}
