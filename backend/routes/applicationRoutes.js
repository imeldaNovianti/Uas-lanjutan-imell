import express from "express";
import upload from "../middleware/upload.js"; // ✅ folder tanpa 's'
import { applyJob ,getMyApplications} from "../controllers/applicationController.js";
import authenticate from "../middleware/authenticate.js";
import { authenticateCompany } from "../middleware/authenticateCompany.js";

const router = express.Router();

// POST /api/applications/:jobId => Apply & upload CV
router.post("/:jobId", authenticate,upload.single("cv"), applyJob);

router.get("/",authenticateCompany, getMyApplications);

export default router;
