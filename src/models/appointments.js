const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
const Appointment = function(appointment){
    this.appointment_id = appointment.appointment_id;
    this.treatment_id = appointment.treatment_id;
    this.appointment_date = appointment.appointment_date;
    this.appointment_shift = appointment.appointment_shift;
    this.appointment_status = appointment.appointment_status;
    this.notes = appointment.notes;

}
Appointment.listAppointment = function(result){
    db.query("Select * from appointment limit 5", function(err,res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            console.log('appointment : ', res);
            result(null, res);
          }
    });
}
db.connect(() => console.log('Sucessfully connected to database'));
module.exports= Appointment;