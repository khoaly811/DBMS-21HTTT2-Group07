const mysql = require('mysql2/promise'); // We use 'mysql2' for async/await support

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const Patient = {
  // Function to create a new patient
  create: async (patient) => {
    const [rows, fields] = await db.execute(
      'INSERT INTO patients (username, idUser, name, phone, avatar) VALUES (?, ?, ?, ?, ?)',
      [patient.username, patient.idUser, patient.name, patient.phone, patient.avatar]
    );
    return rows.insertId;
  },

  // Function to retrieve a patient by their ID
  getById: async (patientId) => {
    const [rows, fields] = await db.execute('SELECT * FROM patients WHERE id = ?', [patientId]);
    return rows[0];
  },

  // Add more functions for updating, deleting, and querying patients as needed.
};

module.exports = Patient;
