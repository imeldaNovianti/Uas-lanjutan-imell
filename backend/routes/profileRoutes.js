// 📁 backend/routes/profileRoutes.js
import express from "express";
import pool from "../config/db.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// CREATE pengalaman kerja
router.post("/experience", authenticate, async (req, res) => {
  const { position, company, location, startDate, endDate, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO experience (user_id, position, company, location, start_date, end_date, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.user.id, position, company, location, startDate, endDate, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah pengalaman", error: err.message });
  }
});

// READ
router.get("/experience", authenticate, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM experience WHERE user_id = $1", [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data", error: err.message });
  }
});

// UPDATE
router.put("/experience/:id", authenticate, async (req, res) => {
  const { position, company, location, startDate, endDate, description } = req.body;
  try {
    await pool.query(
      `UPDATE experience SET position=$1, company=$2, location=$3, start_date=$4, end_date=$5, description=$6 
       WHERE id=$7 AND user_id=$8`,
      [position, company, location, startDate, endDate, description, req.params.id, req.user.id]
    );
    res.json({ message: "Berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update", error: err.message });
  }
});

// DELETE
router.delete("/experience/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM experience WHERE id=$1 AND user_id=$2", [req.params.id, req.user.id]);
    res.json({ message: "Berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus", error: err.message });
  }
});

export default router;
