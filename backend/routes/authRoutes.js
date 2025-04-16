import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// 🔐 Generate JWT Token
const generateToken = (user, role) => {
  return jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

// 🔒 Middleware untuk memverifikasi JWT
const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token tidak valid" });
    req.user = decoded;
    next();
  });
};

// =================== USER ROUTES =================== //
router.post("/register", async (req, res) => {
  const { full_name, email, password, phone, location, bio, profile_picture } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (full_name, email, password, phone, location, bio, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, full_name, email",
      [full_name, email, hashedPassword, phone, location, bio, profile_picture]
    );

    const token = generateToken(result.rows[0], "user");
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax", // This prevents CSRF attacks
      secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS in production
    });

    res.json({ message: "Register berhasil", user: result.rows[0] });
  } catch (err) {
    console.error("Register user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = generateToken(user.rows[0], "user");
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS in production
    });

    res.json({
      message: "Login berhasil",
      user: {
        id: user.rows[0].id,
        full_name: user.rows[0].full_name,
        email: user.rows[0].email,
      },
    });
  } catch (err) {
    console.error("Login user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =================== COMPANY ROUTES =================== //
router.post("/company/register", async (req, res) => {
  const { full_name, email, password, company_name, location, industry, company_logo, description } = req.body;

  if (!email || !password || !company_name) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    const exist = await pool.query("SELECT * FROM companies WHERE email = $1", [email]);
    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Email perusahaan sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO companies (name, email, password, location, industry, company_logo, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email, name",
      [full_name || "", email, hashedPassword, location, industry, company_logo, description]
    );

    const token = generateToken(result.rows[0], "company");
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS in production
    });

    res.json({ message: "Register perusahaan berhasil", company: result.rows[0] });
  } catch (err) {
    console.error("Register company error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/company/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await pool.query("SELECT * FROM companies WHERE email = $1", [email]);
    if (company.rows.length === 0) {
      return res.status(404).json({ message: "Perusahaan tidak ditemukan" });
    }

    const valid = await bcrypt.compare(password, company.rows[0].password);
    if (!valid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = generateToken(company.rows[0], "company");
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS in production
    });

    res.json({
      message: "Login perusahaan berhasil",
      company: {
        id: company.rows[0].id,
        full_name: company.rows[0].full_name,
        email: company.rows[0].email,
        company_name: company.rows[0].company_name,
      },
    });
  } catch (err) {
    console.error("Login company error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =================== LOGOUT =================== //
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout berhasil" });
});

// =================== GET LOGGED IN USER =================== //
router.get("/me", authenticate, async (req, res) => {
  try {
    const { id, role } = req.user;

    if (role === "user") {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      return res.json({ user: result.rows[0] });
    }

    if (role === "company") {
      const result = await pool.query("SELECT * FROM companies WHERE id = $1", [id]);
      return res.json({ company: result.rows[0] });
    }

    return res.status(400).json({ message: "Role tidak dikenal" });
  } catch (err) {
    console.error("Error fetching user/company:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
