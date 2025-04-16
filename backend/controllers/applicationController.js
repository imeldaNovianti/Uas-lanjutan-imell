// import Job from "../models/job.js";
// import Application from "../models/application.js";  // Pastikan model 'Application' ada dan benar
// import { uploadCV } from "../helpers/uploadHelper.js"; // Bisa dibuat jika perlu
// import fs from 'fs';

// // Fungsi untuk mengirim lamaran pekerjaan
// export const applyJob = async (req, res) => {
//   try {
//     const { jobId } = req.body;  // Pastikan jobId ada dalam body

//     // Cari lowongan berdasarkan jobId
//     const job = await Job.findByPk(jobId);
//     if (!job) {
//       return res.status(404).json({ success: false, message: "Lowongan tidak ditemukan." });
//     }

//     // Cek apakah user sudah melamar pekerjaan ini
//     const existingApplication = await Application.findOne({
//       where: {
//         jobId: jobId,
//         userId: req.user.id,  // Ambil userId dari req.user yang sudah di-validate
//       }
//     });

//     if (existingApplication) {
//       return res.status(400).json({ success: false, message: "Anda sudah melamar pekerjaan ini." });
//     }

//     // Proses penyimpanan file CV
//     const filePath = req.file ? req.file.path : null;  // Menyimpan path file jika ada

//     // Simpan lamaran pekerjaan ke database
//     const application = await Application.create({
//       jobId,
//       userId: req.user.id,
//       cvPath: filePath,  // Menyimpan path file CV
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Lamaran pekerjaan berhasil dikirim!",
//       application,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, message: "Terjadi kesalahan, coba lagi." });
//   }
// };

// // Fungsi untuk mengambil semua lamaran pekerjaan milik user login
// export const getMyApplications = async (req, res) => {
//   try {
//     const applications = await Application.findAll({
//       where: {
//         userId: req.user.id,
//       },
//       include: [Job],  // Termasuk data pekerjaan terkait
//     });

//     if (applications.length === 0) {
//       return res.status(404).json({ success: false, message: "Anda belum melamar pekerjaan." });
//     }

//     res.status(200).json({
//       success: true,
//       applications,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, message: "Terjadi kesalahan, coba lagi." });
//   }
// };
