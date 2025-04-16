import db from '../config/db.js';

// ==============================
// Submit Lamaran Pekerjaan
// ==============================
export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id; // dari authMiddleware
    const cvPath = req.file.path;

    await db.query(
      'INSERT INTO applications (user_id, job_id, cv_file, status, applied_at) VALUES ($1, $2, $3, $4, NOW())',
      [userId, jobId, cvPath, 'pending']
    );

    res.status(201).json({ success: true, message: 'Lamaran berhasil dikirim.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Gagal melamar pekerjaan.' });
  }
};

// ==============================
// Ambil Semua Pelamar (untuk company)
// ==============================
export const getMyApplications = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        applications.id AS application_id,
        users.full_name AS name,
        users.email,
        jobs.title AS job,
        applications.cv_file,
        applications.status,
        applications.applied_at
      FROM applications
      JOIN users ON applications.user_id = users.id
      JOIN jobs ON applications.job_id = jobs.id
      ORDER BY applications.applied_at DESC
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: true, applications: [] });
    }

    res.status(200).json({
      success: true,
      applications: result.rows,
    });
  } catch (error) {
    console.error("Error getMyApplications:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan, coba lagi." });
  }
};

// ==============================
// Update Lamaran (untuk pelamar)
// ==============================
export const updateApplication = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const { status } = req.body;  // Status baru (misalnya: diterima, ditolak)

    const result = await db.query(
      'UPDATE applications SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [status, applicationId, req.user.id] // memastikan hanya pelamar yang bisa mengupdate status miliknya
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Lamaran tidak ditemukan atau tidak milik Anda.' });
    }

    res.status(200).json({
      success: true,
      message: 'Status lamaran berhasil diperbarui.',
      application: result.rows[0],
    });
  } catch (error) {
    console.error("Error updateApplication:", error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui status lamaran.' });
  }
};

// ==============================
// Hapus Lamaran (untuk pelamar)
// ==============================
export const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;

    const result = await db.query(
      'DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING *',
      [applicationId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Lamaran tidak ditemukan atau tidak milik Anda.' });
    }

    res.status(200).json({
      success: true,
      message: 'Lamaran berhasil dihapus.',
    });
  } catch (error) {
    console.error("Error deleteApplication:", error);
    res.status(500).json({ success: false, message: 'Gagal menghapus lamaran.' });
  }
};
