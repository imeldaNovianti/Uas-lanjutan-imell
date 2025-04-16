// // backend/controllers/experienceController.js
// const db = require('../models');
// const Experience = db.Experience;

// exports.createExperience = async (req, res) => {
//   const { job_title, company_name, location, start_date, end_date, description } = req.body;
//   try {
//     const newExperience = await Experience.create({
//       user_id: req.user.id, // Menggunakan user ID yang sudah terautentikasi
//       job_title,
//       company_name,
//       location,
//       start_date,
//       end_date,
//       description,
//     });
//     res.status(201).json(newExperience);
//   } catch (error) {
//     res.status(500).json({ error: 'Gagal membuat pengalaman kerja' });
//   }
// };

// exports.getExperience = async (req, res) => {
//   try {
//     const experiences = await Experience.findAll({
//       where: { user_id: req.user.id }, // Mengambil data pengalaman kerja sesuai dengan user ID
//     });
//     res.status(200).json(experiences);
//   } catch (error) {
//     res.status(500).json({ error: 'Gagal mengambil data pengalaman kerja' });
//   }
// };

// exports.updateExperience = async (req, res) => {
//   const { id } = req.params;
//   const { job_title, company_name, location, start_date, end_date, description } = req.body;
//   try {
//     const experience = await Experience.findByPk(id);
//     if (!experience) {
//       return res.status(404).json({ error: 'Pengalaman tidak ditemukan' });
//     }

//     experience.job_title = job_title;
//     experience.company_name = company_name;
//     experience.location = location;
//     experience.start_date = start_date;
//     experience.end_date = end_date;
//     experience.description = description;

//     await experience.save();
//     res.status(200).json(experience); // Mengembalikan pengalaman yang telah diperbarui
//   } catch (error) {
//     res.status(500).json({ error: 'Gagal memperbarui pengalaman kerja' });
//   }
// };

// exports.deleteExperience = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const experience = await Experience.findByPk(id);
//     if (!experience) {
//       return res.status(404).json({ error: 'Pengalaman tidak ditemukan' });
//     }

//     await experience.destroy();
//     res.status(200).json({ message: 'Pengalaman kerja berhasil dihapus' });
//   } catch (error) {
//     res.status(500).json({ error: 'Gagal menghapus pengalaman kerja' });
//   }
// };
