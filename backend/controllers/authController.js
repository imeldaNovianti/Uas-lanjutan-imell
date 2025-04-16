import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// Generate JWT Token
const generateToken = (user, role) => {
  return jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// ============== USER ==============
export const registerUser = async (req, res) => {
  const { full_name, email, password } = req.body;

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
      "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email",
      [full_name, email, hashedPassword]
    );

    const token = generateToken(result.rows[0], "user");
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });

    res.json({ message: "Register berhasil", user: result.rows[0] });
  } catch (err) {
    console.error("Register user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
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
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });

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
};

// ============== COMPANY ==============
export const registerCompany = async (req, res) => {
  const { full_name, email, password, company_name } = req.body;

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
      "INSERT INTO companies (full_name, email, password, company_name) VALUES ($1, $2, $3, $4) RETURNING id, full_name, email, company_name",
      [full_name || "", email, hashedPassword, company_name]
    );

    const token = generateToken(result.rows[0], "company");
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });

    res.json({ message: "Register perusahaan berhasil", company: result.rows[0] });
  } catch (err) {
    console.error("Register company error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginCompany = async (req, res) => {
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
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });

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
};
routes/applicationRoutes.js
router.get("/applications", async (req, res) => {
    try {
      const userId = req.user.id;  // Pastikan ada middleware otentikasi
      const applications = await Application.findAll({
        where: { user_id: userId },  // Pastikan query ini sesuai dengan struktur database kamu
        include: [{ model: Job, as: "job" }]
      });
      res.json({ applications });
    } catch (error) {
      res.status(500).json({ message: "Error fetching applications", error });
    }
  });
  