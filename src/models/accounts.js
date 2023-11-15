const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect()
db.query('select Dentist_ID from DENTIST', (err, result) => {
    if (err) throw err;
    console.log(result[0])
})
db.query('select Staff_ID from STAFF', (err, result) => {
    if (err) throw err;
    console.log(result[0])
})
db.query('select PATIENT_ID from PATIENT', (err, result) => {
    if (err) throw err;
    console.log(result[0])
})
db.end()