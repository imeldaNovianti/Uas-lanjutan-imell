// import Sequelize from "sequelize";
// import dotenv from "dotenv";
// import UserModel from "./user.js";
// import CompanyModel from "./company.js";
// import JobModel from "./job.js";

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "postgres",
//     logging: false,
//   }
// );

// // Inisialisasi model
// const User = UserModel(sequelize, Sequelize.DataTypes);
// const Company = CompanyModel(sequelize, Sequelize.DataTypes);
// const Job = JobModel(sequelize, Sequelize.DataTypes);

// // Relasi antar model (jika ada)
// Company.hasMany(Job, { foreignKey: "company_id", onDelete: "CASCADE" });
// Job.belongsTo(Company, { foreignKey: "company_id" });

// User.hasMany(Job, { foreignKey: "user_id", onDelete: "SET NULL" }); // contoh
// // Job.belongsTo(User, { foreignKey: "user_id" }); // opsional jika job relate ke user

// // Export
// export { sequelize, User, Company, Job };
