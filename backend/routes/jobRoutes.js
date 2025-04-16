import express from 'express';
import { getAllJobs, postJob } from '../controllers/jobController.js'; // Pastikan path controller sudah benar
const router = express.Router();

// Menambahkan rute untuk mendapatkan semua lowongan pekerjaan
router.get('/', getAllJobs);

// Menambahkan rute untuk memposting lowongan pekerjaan
router.post('/company/jobs', postJob);

export default router;
