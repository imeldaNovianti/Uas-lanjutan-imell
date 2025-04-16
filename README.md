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
-- 1. Table Users (Pelamar)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone VARCHAR(20),
  location VARCHAR(100),
  bio TEXT,
  profile_picture TEXT,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table Companies
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  location VARCHAR(100),
  industry VARCHAR(100),
  company_logo TEXT,
  description TEXT,
  role VARCHAR(20) DEFAULT 'company',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table Jobs (Lowongan Kerja)
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  type VARCHAR(50), -- e.g. Full-time, Part-time, Remote
  description TEXT,
  requirements TEXT,
  salary VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table Applications (Lamaran)
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  cv_file TEXT, -- path/URL file CV yang diupload
  status VARCHAR(50) DEFAULT 'Dikirim', -- Dikirim / Diproses / Diterima / Ditolak
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table Experiences (Pengalaman Kerja)
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_title VARCHAR(100),
  company_name VARCHAR(100),
  location VARCHAR(100),
  start_date DATE,
  end_date DATE,
  description TEXT
);

-- 6. Table Educations (Pendidikan)
CREATE TABLE educations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  institution_name VARCHAR(100),
  degree VARCHAR(100),
  field_of_study VARCHAR(100),
  start_date DATE,
  end_date DATE,
  description TEXT
);

-- 7. Table Skills (Keahlian)
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL
);

-- 8. Table Certifications (Sertifikasi)
CREATE TABLE certifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100),
  issuer VARCHAR(100),
  date_awarded DATE,
  description TEXT
);

-- 9. Table Notifications
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  company_id INTEGER,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- 10. Table Saved Jobs (Lowongan yang disimpan)
CREATE TABLE saved_jobs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO companies (id, name, email, password, location, industry, company_logo, description)
VALUES (
  1,
  'PT Teknologi Masa Depan',
  'hr@tekmasdep.co.id',
  'hashed_password_dummy',
  'Jakarta',
  'Teknologi Informasi',
  'https://example.com/logo.png',
  'Perusahaan startup yang bergerak di bidang pengembangan teknologi masa depan.'
);




INSERT INTO jobs (company_id, title, location, type, description, requirements, salary)
VALUES
(1, 'Frontend Developer', 'Jakarta', 'Full-time', 'Membangun UI modern menggunakan React.', 'Pengalaman dengan React, Tailwind, Git', 'Rp10.000.000 - Rp15.000.000'),
(1, 'Backend Developer', 'Remote', 'Remote', 'Membangun REST API dengan Node.js dan PostgreSQL.', 'Node.js, Express, PostgreSQL', 'Rp12.000.000 - Rp18.000.000'),
(1, 'UI/UX Designer', 'Bandung', 'Full-time', 'Mendesain antarmuka dan pengalaman pengguna.', 'Figma, Adobe XD, Design Thinking', 'Rp8.000.000 - Rp12.000.000'),
(1, 'Mobile Developer', 'Surabaya', 'Full-time', 'Membangun aplikasi mobile dengan Flutter.', 'Flutter, Dart, REST API', 'Rp11.000.000 - Rp16.000.000'),
(1, 'Data Analyst', 'Jakarta', 'Full-time', 'Menganalisis data bisnis.', 'SQL, Python, Tableau', 'Rp10.000.000 - Rp14.000.000'),
(1, 'DevOps Engineer', 'Remote', 'Remote', 'Otomatisasi CI/CD dan cloud infrastructure.', 'Docker, AWS, CI/CD', 'Rp15.000.000 - Rp20.000.000'),
(1, 'QA Engineer', 'Yogyakarta', 'Full-time', 'Menulis test plan dan QA automation.', 'Selenium, Jest, Manual Testing', 'Rp9.000.000 - Rp13.000.000'),
(1, 'Software Engineer Intern', 'Jakarta', 'Internship', 'Bergabung dengan tim pengembangan software.', 'Mahasiswa aktif, dasar pemrograman', 'Rp2.500.000'),
(1, 'IT Support', 'Bandung', 'Full-time', 'Memberikan dukungan teknis.', 'Troubleshooting, jaringan, komunikasi', 'Rp6.000.000 - Rp8.000.000'),
(1, 'Cybersecurity Specialist', 'Remote', 'Remote', 'Melindungi sistem dari ancaman digital.', 'Keamanan jaringan, enkripsi', 'Rp14.000.000 - Rp19.000.000'),

-- Copy 40 data tambahan dengan variasi posisi dan lokasi:
(1, 'Project Manager', 'Jakarta', 'Full-time', 'Mengelola proyek pengembangan software.', 'Scrum, komunikasi, leadership', 'Rp16.000.000 - Rp22.000.000'),
(1, 'Business Analyst', 'Bandung', 'Full-time', 'Menganalisis kebutuhan bisnis.', 'Dokumentasi, SQL, komunikasi', 'Rp10.000.000 - Rp14.000.000'),
(1, 'System Administrator', 'Remote', 'Full-time', 'Mengelola sistem dan server.', 'Linux, bash scripting', 'Rp12.000.000 - Rp16.000.000'),
(1, 'Network Engineer', 'Surabaya', 'Full-time', 'Mendesain dan memelihara jaringan.', 'Cisco, subnetting, keamanan jaringan', 'Rp10.000.000 - Rp13.000.000'),
(1, 'Content Writer', 'Remote', 'Part-time', 'Menulis artikel teknologi.', 'SEO, WordPress', 'Rp4.000.000 - Rp6.000.000'),
(1, 'AI Engineer', 'Jakarta', 'Full-time', 'Membangun model AI dan ML.', 'Python, TensorFlow, data science', 'Rp17.000.000 - Rp23.000.000'),
(1, 'Digital Marketing Specialist', 'Yogyakarta', 'Full-time', 'Strategi pemasaran digital.', 'SEO, Ads, Analytics', 'Rp8.000.000 - Rp11.000.000'),
(1, 'Product Manager', 'Jakarta', 'Full-time', 'Mengatur arah produk digital.', 'Analisa, komunikasi, agile', 'Rp18.000.000 - Rp25.000.000'),
(1, 'Graphic Designer', 'Bandung', 'Part-time', 'Membuat desain visual kreatif.', 'Photoshop, Illustrator', 'Rp5.000.000 - Rp7.000.000'),
(1, 'HR IT Recruiter', 'Jakarta', 'Full-time', 'Rekrutmen tim IT.', 'Talent sourcing, wawancara', 'Rp8.000.000 - Rp10.000.000'),

-- lanjut sampai total 50:
(1, 'Database Administrator', 'Remote', 'Full-time', 'Maintain database PostgreSQL.', 'PostgreSQL, backup, tuning', 'Rp13.000.000 - Rp17.000.000'),
(1, 'Video Editor', 'Jakarta', 'Part-time', 'Edit video promosi produk.', 'Premiere, After Effects', 'Rp6.000.000'),
(1, 'Customer Support Engineer', 'Yogyakarta', 'Full-time', 'Membantu klien teknis.', 'Komunikasi, troubleshooting', 'Rp7.000.000 - Rp9.000.000'),
(1, 'Penetration Tester', 'Remote', 'Full-time', 'Uji penetrasi keamanan sistem.', 'Kali Linux, Metasploit', 'Rp14.000.000 - Rp18.000.000'),
(1, 'SEO Specialist', 'Bandung', 'Full-time', 'Optimasi SEO website.', 'Google Analytics, SEO tools', 'Rp7.000.000 - Rp10.000.000'),
(1, 'E-commerce Manager', 'Surabaya', 'Full-time', 'Kelola operasional e-commerce.', 'Marketplace, manajemen stok', 'Rp9.000.000 - Rp13.000.000'),
(1, 'Social Media Manager', 'Remote', 'Part-time', 'Mengelola konten sosial media.', 'Instagram, TikTok, analytics', 'Rp5.000.000'),
(1, 'Game Developer', 'Yogyakarta', 'Full-time', 'Membuat game menggunakan Unity.', 'C#, Unity3D', 'Rp12.000.000 - Rp16.000.000'),
(1, 'AR/VR Developer', 'Jakarta', 'Full-time', 'Kembangkan aplikasi AR/VR.', 'Unity, ARKit, ARCore', 'Rp15.000.000 - Rp20.000.000'),
(1, 'Cloud Engineer', 'Remote', 'Full-time', 'Implementasi cloud di AWS.', 'AWS, Terraform', 'Rp14.000.000 - Rp18.000.000'),
(1, 'Scrum Master', 'Bandung', 'Full-time', 'Fasilitasi tim scrum.', 'Scrum, Agile Coach', 'Rp12.000.000 - Rp17.000.000'),
(1, 'Penulis Teknis', 'Remote', 'Part-time', 'Menulis dokumentasi teknis.', 'Markdown, GitBook', 'Rp4.500.000'),
(1, 'Junior Frontend', 'Jakarta', 'Internship', 'Bantu tim frontend dev.', 'HTML, CSS, JS dasar', 'Rp3.000.000'),
(1, 'Junior Backend', 'Jakarta', 'Internship', 'Bantu tim backend dev.', 'Express, PostgreSQL dasar', 'Rp3.000.000'),
(1, 'Junior QA', 'Remote', 'Internship', 'Bantu QA testing manual.', 'Testing dasar', 'Rp2.500.000'),
(1, 'Junior UI/UX', 'Remote', 'Internship', 'Belajar desain UI/UX.', 'Figma dasar', 'Rp2.500.000'),
(1, 'Content Strategist', 'Bandung', 'Full-time', 'Strategi konten digital.', 'Copywriting, brand voice', 'Rp7.000.000 - Rp10.000.000'),
(1, 'Tech Support', 'Surabaya', 'Full-time', 'Dukungan teknis internal.', 'Helpdesk, komunikasi', 'Rp6.000.000 - Rp8.000.000'),
(1, 'Web Developer', 'Jakarta', 'Full-time', 'Bangun web dinamis.', 'HTML, CSS, JS, React', 'Rp10.000.000 - Rp14.000.000'),
(1, 'Python Developer', 'Remote', 'Full-time', 'Backend menggunakan Python.', 'Flask, Django, PostgreSQL', 'Rp13.000.000 - Rp18.000.000'),
(1, 'Machine Learning Engineer', 'Remote', 'Full-time', 'Model ML dan data pipelines.', 'Scikit-learn, Pandas, Jupyter', 'Rp17.000.000 - Rp22.000.000'),
(1, 'Support Intern', 'Remote', 'Internship', 'Bantu support & entry data.', 'Excel, komunikasi', 'Rp2.000.000');
