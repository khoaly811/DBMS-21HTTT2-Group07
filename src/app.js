const express = require('express');
const app = express();
const MAIN_PORT = 9696; // Change to a number, not a string
const staffRoute = require("./routes/staffRoute");
const dentistRoute = require("./routes/dentistRoute");
const patientRoute = require("./routes/patientRoute");
const patientListRoute = require("./routes/patientListRoute");
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

// Your Express.js routes and middleware can go here

app.listen(MAIN_PORT, function(){
    console.log(`Server started on port ${MAIN_PORT}`);
});

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.render('login');
});
app.use("/", patientListRoute);
// app.use("/", adminRoute);
// app.use("/", staffRoute);
// app.use("/", dentistRoute);
// app.use("/", patientRoute);
