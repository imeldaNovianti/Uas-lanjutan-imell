// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";
// import { Company } from "./company.js"; // Impor terlebih dahulu agar relasi bisa dibentuk

// export const Job = sequelize.define("Job", {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   location: {
//     type: DataTypes.STRING,
//   },
//   type: {
//     type: DataTypes.STRING, // e.g. Full-time, Remote
//   },
//   description: {
//     type: DataTypes.TEXT,
//   },
//   requirements: {
//     type: DataTypes.TEXT,
//   },
//   salary: {
//     type: DataTypes.STRING,
//   },
//   created_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   tableName: "jobs",
//   timestamps: false, // karena kita pakai created_at manual
// });

// // Relasi: Setiap job dimiliki oleh satu company
// Job.belongsTo(Company, {
//   foreignKey: "company_id",
//   as: "Company",
// });
