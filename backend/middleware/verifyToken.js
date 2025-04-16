// // import jwt from "jsonwebtoken";

// // const verifyToken = (req, res, next) => {
// //   const token = req.cookies.token;
// //   if (!token) {
// //     return res.status(401).json({ error: "Tidak ada token. Silakan login." });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.SECRET_KEY);
// //     req.user = decoded; // simpan info user di req.user
// //     next();
// //   } catch (error) {
// //     return res.status(403).json({ error: "Token tidak valid" });
// //   }
// // };

// // export default verifyToken;
// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Memeriksa token di cookie atau header

//   if (!token) {
//     return res.status(403).json({ error: "Token tidak ditemukan, harap login terlebih dahulu." });
//   }

//   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: "Token tidak valid atau sudah kedaluwarsa." });
//     }
//     req.user = user; // Menyimpan informasi user yang terautentikasi
//     next();
//   });
// };
