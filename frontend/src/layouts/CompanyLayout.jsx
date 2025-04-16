// src/layouts/CompanyLayout.jsx
import { Outlet } from "react-router-dom";
import HeaderCompany from "../components/HeaderCompany";
import FooterCompany from "../components/Footer-Company";

export default function CompanyLayout() {
  return (
    <>
      <HeaderCompany />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-8">
        <Outlet /> {/* Ini yang akan render child route-nya */}
      </main>
      <FooterCompany />
    </>
  );
}
