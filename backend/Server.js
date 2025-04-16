import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";  // Untuk CRUD lowongan kerja (private dan public)

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.BASE_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);         // Login, register user & company
app.use("/api/profile", profileRoutes);   // Endpoint untuk profile user
app.use("/api/company", companyRoutes);   // Endpoint khusus untuk role company

// Pastikan rute untuk job dibedakan antara public dan private
app.use("/api/jobs", jobRoutes);          // Endpoint private job (POST, PUT, DELETE, GET)
app.use("/api/public/jobs", jobRoutes);   // Endpoint public job (GET)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Rute tidak ditemukan" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
