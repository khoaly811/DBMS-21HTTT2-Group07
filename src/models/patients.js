const db = require("./db.js");

const Patient = function(patient){
    this.patient_id = patient.patient_id;
    this.full_name = patient.full_name;
    this.dob = patient.dob;
    this.gender = patient.gender;
    this.allergies = patient.allergies;
};
Patient.getall = function(req,res,next){
    db.query("Select * from patient limit 5", function(err,data){
        if (err){
            return next(err);
        }
        // console.log(data);
        res.render('patientList', {patientData: data});
    });
};
module.exports = Patient;