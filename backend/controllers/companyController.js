import pool from "../config/db.js";

// CREATE - Posting lowongan
export const postJob = async (req, res) => {
  const { title, description, location, type, salary } = req.body;
  const companyId = req.company?.id;

  console.log (companyId)

  if (!title || !description || !location || !type || !salary) {
    return res.status(400).json({ error: "Semua field harus diisi!" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO jobs (title, description, location, type, salary, company_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, location, type, salary, companyId]
    );
    res.status(201).json({ message: "Lowongan berhasil diposting!", job: result.rows[0] });
  } catch (error) {
    console.error("❌ Error posting job:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat memposting lowongan" });
  }
};

// READ - Semua lowongan milik perusahaan saat ini
export const getAllJobs = async (req, res) => {
  const companyId = req.company?.id;

  try {
    const result = await pool.query("SELECT * FROM jobs WHERE company_id = $1", [companyId]);
    res.json({ jobs: result.rows });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil lowongan" });
  }
};

// READ - Dapatkan lowongan berdasarkan ID
export const getJobById = async (req, res) => {
  const jobId = req.params.id;
  const companyId = req.company?.id;

  try {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1 AND company_id = $2", [jobId, companyId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Lowongan tidak ditemukan!" });
    }
    res.json({ job: result.rows[0] });
  } catch (error) {
    console.error("❌ Error get job by ID:", error.message);
    res.status(500).json({ error: "Gagal mengambil lowongan" });
  }
};

// UPDATE - Edit lowongan
export const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const { title, description, location, type, salary } = req.body;
  const companyId = req.company?.id;

  if (!title || !description || !location || !type || !salary) {
    return res.status(400).json({ error: "Semua field harus diisi!" });
  }

  try {
    const result = await pool.query(
      `UPDATE jobs SET title = $1, description = $2, location = $3, type = $4, salary = $5 
       WHERE id = $6 AND company_id = $7 RETURNING *`,
      [title, description, location, type, salary, jobId, companyId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Lowongan tidak ditemukan!" });
    }

    res.json({ message: "Lowongan berhasil diperbarui", job: result.rows[0] });
  } catch (error) {
    console.error("❌ Error updating job:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui lowongan" });
  }
};

// DELETE - Hapus lowongan
export const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const companyId = req.company?.id;

  try {
    const result = await pool.query("DELETE FROM jobs WHERE id = $1 AND company_id = $2 RETURNING *", [jobId, companyId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Lowongan tidak ditemukan!" });
    }

    res.json({ message: "Lowongan berhasil dihapus", deletedJob: result.rows[0] });
  } catch (error) {
    console.error("❌ Error deleting job:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus lowongan" });
  }
};

// GET Profil Perusahaan
export const getCompanyProfile = (req, res) => {
  const company = req.company;
  if (!company) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({
    id: company.id,
    name: company.name,
    email: company.email,
  });
};
