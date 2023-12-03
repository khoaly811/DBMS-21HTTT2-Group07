const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('adb_nhakhoa', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
});

const Accounts = sequelize.define('accounts', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passconfirm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

// const Dentist = sequelize.define('dentist', {
//   dentist_id: {
//     type: DataTypes.STRING,
//     primaryKey: true,
//     unique: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   full_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   dob: {
//     type: DataTypes.DATE,
//   },
//   gender: {
//     type: DataTypes.CHAR,
//   },
//   clinic: {
//     type: DataTypes.STRING,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true,
//     },
//   },
// }, {
//   timestamps: false,
//   freezeTableName: true
// });

// Accounts.hasOne(Dentist, { as: '$Dentist', foreignKey: 'username' });
// Dentist.hasOne(Accounts, { as: '$Account', foreignKey: 'dentist_id' });

// // const Patient = sequelize.define('patient', {
// //   patient_id: {
// //     type: DataTypes.STRING,
// //     primaryKey: true,
// //     unique: true,
// //     autoIncrement: true,
// //   },
// //   full_name: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   dob: {
// //     type: DataTypes.DATE,
// //   },
// //   gender: {
// //     type: DataTypes.CHAR,
// //   },
// //   allergies: {
// //     type: DataTypes.STRING,
// //   },
// // }, {
// //   timestamps: false,
// //   freezeTableName: true
// // });

// // Accounts.hasOne(Patient, { as: '$Patient', foreignKey: 'username' });
// // Patient.hasOne(Accounts, { as: '$Account', foreignKey: 'patient_id' });

module.exports = Accounts;
// module.exports = Dentist;
// module.exports = Patient;