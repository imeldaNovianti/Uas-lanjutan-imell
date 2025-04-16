// import { Job } from "../models/job.js";
// import { Company } from "../models/company.js";

// export const getAllJobsPublic = async (req, res) => {
//   try {
//     const jobs = await Job.findAll({
//       include: [
//         {
//           model: Company,
//           attributes: ["company_name", "company_logo"], // pastikan logo juga ada kalau perlu
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     });

//     res.status(200).json(jobs);
//   } catch (error) {
//     console.error("Gagal mengambil lowongan:", error);
//     res.status(500).json({ message: "Gagal mengambil lowongan" });
//   }
// };
