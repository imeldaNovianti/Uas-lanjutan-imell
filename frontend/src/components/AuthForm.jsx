// frontend/AuthForm.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👉 Tambahkan ini

const AuthForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 👉 Tambahkan ini

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const res = await axios.post(url, form);
      setMessage(res.data.message || (isLogin ? "Login berhasil" : "Register berhasil"));

      if (res.data.accessToken && res.data.refreshToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        // 🚀 Arahkan ke halaman Home setelah login/register
        navigate("/");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.response?.data?.error || "Terjadi kesalahan";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 underline">
          {isLogin ? "Daftar di sini" : "Login di sini"}
        </button>
      </p>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default AuthForm;
