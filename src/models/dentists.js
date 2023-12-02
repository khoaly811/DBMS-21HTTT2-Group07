const db = require("./db");

const Dentist = function(patient){
    this.patient_id = patient.patient_id;
    this.full_name = patient.full_name;
    this.dob = patient.dob;
    this.gender = patient.gender;
    this.allergies = patient.allergies;
};

Dentist.getAll = function (req, res, next) {

    db.query("call sp_get_dentist(?,?,?)", [req.body.clinic, req.body.appointment_date, req.body.shift],
     function (err, data) {
        if(err) {
          next(err)
        }
        console.log(req.body)
        res.render('bookDentist', { dentists: data[0]})
        console.log(data[0])
    });
};

module.exports = Dentist;