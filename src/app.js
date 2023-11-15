const express = require('express');
const fs = require('fs');
const app = express();
const MAIN_PORT = 9696; // Change to a number, not a string

// Check if the server.pid file exists
if (fs.existsSync('server.pid')) {
  // Read the PID of the previous server
  const previousServerPID = fs.readFileSync('server.pid', 'utf8');

  // Attempt to terminate the previous server process
  try {
    process.kill(previousServerPID, 'SIGTERM');
    console.log(`Terminated previous server process with PID ${previousServerPID}`);
  } catch (error) {
    console.error(`Error terminating previous server process: ${error.message}`);
  }
}

// Store the current server's PID in the server.pid file
fs.writeFileSync('server.pid', process.pid.toString(), 'utf8');

// Continue with your server setup
const patientListRoute = require("./routes/patientListRoute");
const bookingAppointmentRoute = require("./routes/bookingAppointmentRoute");

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

app.listen(MAIN_PORT, function () {
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

app.use("/appointment", bookingAppointmentRoute);
