// // companyController.js
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Company from '../models/company.js'; // Pastikan model sesuai

// // Login untuk perusahaan
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const company = await Company.findOne({ where: { email } });
//     if (!company) {
//       return res.status(404).json({ error: 'Perusahaan tidak ditemukan' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, company.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Password salah' });
//     }

//     const token = jwt.sign({ companyId: company.id }, process.env.SECRET_KEY, {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Terjadi kesalahan pada server' });
//   }
// };

// // Register untuk perusahaan
// export const register = async (req, res) => {
//   const { company_name, email, password } = req.body;

//   try {
//     const existingCompany = await Company.findOne({ where: { email } });
//     if (existingCompany) {
//       return res.status(400).json({ error: 'Email sudah terdaftar' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newCompany = await Company.create({
//       company_name,
//       email,
//       password: hashedPassword,
//     });

//     const token = jwt.sign({ companyId: newCompany.id }, process.env.SECRET_KEY, {
//       expiresIn: '1h',
//     });

//     res.status(201).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Terjadi kesalahan pada server' });
//   }
// };
