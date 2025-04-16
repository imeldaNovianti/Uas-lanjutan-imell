// import multer from 'multer';

// // Setup multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Folder tempat file disimpan
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Setup file validation (PDF, DOC, JPG, PNG, dll.)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'application/msword', 'image/jpeg', 'image/png'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Tipe file tidak diizinkan! Harus PDF, DOC, JPG, atau PNG.'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export { upload };
