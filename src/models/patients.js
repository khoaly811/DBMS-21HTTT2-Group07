const db = require("./db.js");

const Patient = function(patient){
    this.patient_id = patient.patient_id;
    this.full_name = patient.full_name;
    this.dob = patient.dob;
    this.gender = patient.gender;
    this.allergies = patient.allergies;
};

Patient.listPatient = function(req, res, next) {
    db.query('CALL sp_patient()', function(err, data) {
        if (err) {
            return next(err);
        }
        res.render('patientList', { patientData: data[0] });
    });
};
Patient.listPatientPro = function(req, res, next) {
    const IDuser = req.params.id;
    let sql = 'CALL GetPatientInfo(?)';

    db.query(sql, [IDuser], function(err, patientData) {
        if (err) {
            return next(err);
        }
        console.log(patientData);
        res.render('patientProfile', { patientData: patientData[0] , patie:patientData[1]});
    });
};



module.exports = Patient;