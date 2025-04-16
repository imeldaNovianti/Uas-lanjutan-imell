// // backend/models/experience.js
// module.exports = (sequelize, DataTypes) => {
//   const Experience = sequelize.define('Experience', {
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     job_title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     company_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     location: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     start_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     end_date: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   });

//   Experience.associate = (models) => {
//     Experience.belongsTo(models.User, {
//       foreignKey: 'user_id',
//       as: 'user',
//     });
//   };

//   return Experience;
// };
