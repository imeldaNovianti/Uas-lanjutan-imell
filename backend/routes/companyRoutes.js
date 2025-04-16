import express from "express";
import {
  postJob,
  updateJob,
  deleteJob,
  getCompanyProfile,
  getAllJobs,
  getJobById,
} from "../controllers/companyController.js";
import { authenticateCompany } from "../middleware/authenticateCompany.js";

const router = express.Router();

// ✅ Profil perusahaan
router.get("/profile", authenticateCompany, getCompanyProfile);

// ✅ Semua lowongan (untuk company)
router.get("/jobs", authenticateCompany, getAllJobs);

// ✅ Lowongan berdasarkan ID
router.get("/jobs/:id", authenticateCompany, getJobById);

// ✅ Posting lowongan
router.post("/jobs", authenticateCompany, postJob);

// ✅ Edit lowongan
router.put("/jobs/:id", authenticateCompany, updateJob);

// ✅ Hapus lowongan
router.delete("/jobs/:id", authenticateCompany, deleteJob);

router.get("/jobs", authenticateCompany, getAllJobs);


export default router;
