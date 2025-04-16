# Uas-Lanjutan-Imelda

**Uas-Lanjutan-Imelda** adalah sebuah aplikasi portal lowongan kerja yang dirancang untuk menghubungkan pelamar pekerjaan dengan perusahaan. Aplikasi ini memungkinkan pengguna untuk mencari lowongan pekerjaan, melamar pekerjaan, dan bagi perusahaan untuk memposting lowongan pekerjaan serta mengelola pelamar yang masuk.

## Deskripsi

Aplikasi ini memiliki dua jenis pengguna: **Pelamar** dan **Perusahaan**. Pelamar dapat mendaftar, mencari pekerjaan, melamar pekerjaan, serta melihat riwayat lamaran mereka. Perusahaan dapat mendaftar, memposting lowongan pekerjaan, mengelola lamaran yang masuk, dan melihat profil pelamar. Aplikasi ini dilengkapi dengan fitur autentikasi yang aman menggunakan JWT dan cookie, serta berbagai fitur tambahan yang mendukung pengalaman pengguna.

## Fitur

### Fitur Pelamar:
- **Pendaftaran dan login**: Pengguna dapat mendaftar dan login menggunakan email dan password.
- **Pencarian dan penyaringan lowongan pekerjaan**: Pelamar dapat mencari lowongan berdasarkan kriteria tertentu seperti posisi, lokasi, gaji, dan kategori industri.
- **Melamar pekerjaan**: Pelamar dapat mengajukan lamaran untuk lowongan yang ditemukan dan mengunggah CV.
- **Riwayat lamaran**: Pelamar dapat melihat riwayat lamaran pekerjaan yang sudah diajukan.
- **Profil pelamar**: Pelamar dapat mengedit profil mereka, termasuk nama, email, pengalaman kerja, dan pendidikan.
- **Tips Karir**: Pelamar dapat mengakses artikel dan tips seputar dunia kerja, seperti cara menulis CV yang baik, mempersiapkan wawancara kerja, dan tips membangun karir.

### Fitur Perusahaan:
- **Pendaftaran dan login perusahaan**: Perusahaan dapat mendaftar dan login untuk mengelola lowongan kerja mereka.
- **Memposting lowongan pekerjaan**: Perusahaan dapat memposting lowongan kerja dan mengeditnya kapan saja.
- **Mengelola pelamar**: Perusahaan dapat melihat pelamar yang melamar pekerjaan mereka, serta memberikan status diterima atau ditolak.
- **Dashboard perusahaan**: Perusahaan memiliki dashboard untuk mengelola semua lowongan pekerjaan yang diposting dan melihat pelamar yang masuk.

### Fitur Pencarian dan Sorting:
- **Pencarian lowongan pekerjaan**: Pelamar dapat mencari lowongan berdasarkan kata kunci seperti posisi pekerjaan, lokasi, atau industri.
- **Sorting lowongan**: Lowongan pekerjaan dapat disortir berdasarkan berbagai kriteria seperti tanggal posting, gaji, atau relevansi dengan pencarian pengguna.
- **Penyaringan lowongan**: Pelamar dapat menggunakan filter untuk mempersempit pencarian berdasarkan kriteria seperti lokasi, jenis pekerjaan (full-time, part-time), pengalaman yang dibutuhkan, dan kisaran gaji.

## Diagram ER

![Diagram ER](./erd.jpg)
![alt text](src/assets/ERD.jpg)

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express, JWT, bcryptjs, dotenv, CORS
- **Database**: PostgreSQL
- **Deployment**: Supabase (untuk database), Vercel (untuk frontend)
- **Authentication**: JWT, Cookies
- **DevOps**: GitHub Actions, Docker

=========================================================================================================================================================
                                         DATABASE POSTGREE

=========================================================================================================================================================
