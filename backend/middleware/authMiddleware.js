// import jwt from "jsonwebtoken";
// import { SECRET_KEY } from "../config/config.js";

// export const authenticate = (req, res, next) => {
//   const token = req.cookies.token;  // Mengambil token dari cookie
  
//   if (!token) {
//     return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan!" });
//   }
  
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded;  // Menyimpan informasi pengguna yang terautentikasi
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Token tidak valid!" });
//   }
// };

// export const isCompany = (req, res, next) => {
//   if (req.user.role !== 'company') {
//     return res.status(403).json({ message: "Akses hanya untuk perusahaan!" });
//   }
//   next();
// };

