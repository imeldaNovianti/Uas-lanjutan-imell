import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateCompany = (req, res, next) => {
  // Ambil token dari cookie atau header Authorization
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan." });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Set data perusahaan pada request untuk digunakan di route berikutnya
    req.company = decoded;

    next(); // Lanjutkan ke route berikutnya
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid." });
  }
};
