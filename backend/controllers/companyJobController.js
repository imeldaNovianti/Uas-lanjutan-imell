// // Update lowongan kerja
// export const updateJob = async (req, res) => {
//   const { id } = req.params;
//   const { judul, deskripsi, lokasi, tipe, gaji } = req.body;

//   if (!judul || !deskripsi || !lokasi || !tipe || !gaji) {
//     return res.status(400).json({ error: "Semua field harus diisi!" });
//   }

//   try {
//     const result = await pool.query(
//       "UPDATE jobs SET title=$1, description=$2, location=$3, type=$4, salary=$5 WHERE id=$6 RETURNING *",
//       [judul, deskripsi, lokasi, tipe, gaji, id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Lowongan tidak ditemukan" });
//     }

//     res.json({ message: "Lowongan berhasil diperbarui!", job: result.rows[0] });
//   } catch (error) {
//     console.error("❌ Error update job:", error.message);
//     res.status(500).json({ error: "Gagal memperbarui lowongan" });
//   }
// };

// // Hapus lowongan kerja
// export const deleteJob = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query("DELETE FROM jobs WHERE id=$1 RETURNING *", [id]);

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Lowongan tidak ditemukan" });
//     }

//     res.json({ message: "Lowongan berhasil dihapus" });
//   } catch (error) {
//     console.error("❌ Error delete job:", error.message);
//     res.status(500).json({ error: "Gagal menghapus lowongan" });
//   }
// };
