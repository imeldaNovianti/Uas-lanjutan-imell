import client from "../config/db.js"; // Pastikan path ke db.js benar

// Controller untuk mendapatkan semua lowongan pekerjaan
export const getAllJobs = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM jobs");
    res.status(200).json(result.rows); // Mengirimkan data lowongan dalam bentuk JSON
  } catch (error) {
    console.error("Gagal mengambil data lowongan:", error);
    res.status(500).json({ error: "Gagal mengambil data lowongan pekerjaan" });
  }
};

// Controller untuk memposting lowongan pekerjaan
export const postJob = async (req, res) => {
  const { title, description, location, type, salary } = req.body;

  // Validasi input
  if (!title || !description || !location || !type || !salary) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  try {
    // Menyimpan lowongan pekerjaan baru ke database
    const result = await client.query(
      "INSERT INTO jobs (title, description, location, type, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, location, type, salary]
    );
    res.status(201).json(result.rows[0]); // Mengirimkan data lowongan yang baru diposting
  } catch (error) {
    console.error("Gagal memposting lowongan:", error);
    res.status(500).json({ error: "Gagal memposting lowongan pekerjaan" });
  }
};
