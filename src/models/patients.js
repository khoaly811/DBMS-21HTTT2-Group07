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

//     USE `adb_nhakhoa`;
// DELIMITER //

// CREATE PROCEDURE GetPatientInfo(IN p_IDuser INT)
// BEGIN
//     DECLARE totalPaidFee DECIMAL(10, 2);
//     DECLARE treatmentCount INT;

//     -- Get patient information
//     SELECT * FROM patient WHERE PATIENT_ID = p_IDuser;

//     -- Get total paid fee
//     SELECT SUM(INVOICE.PAID_FEE) INTO totalPaidFee
//     FROM TREATMENT
//     JOIN INVOICE ON TREATMENT.TREATMENT_ID = INVOICE.TREATMENT_ID
//     WHERE TREATMENT.PATIENT_ID = p_IDuser;

//     -- Get treatment count
//     SELECT COUNT(DISTINCT TREATMENT_ID) INTO treatmentCount
//     FROM TREATMENT
//     WHERE PATIENT_ID = p_IDuser;

//     -- Return results
//     SELECT totalPaidFee AS TotalPaidFee, treatmentCount AS TreatmentCount;
    
// END //

// DELIMITER ;
    const IDuser = req.params.id;
    let sql = 'CALL GetPatientInfo(?)';

    db.query(sql, [IDuser], function(err, patientData) {
        if (err) {
            return next(err);
        }
        res.render('patientProfile', { patientData: patientData[0] , patie:patientData[1]});
    });
};
Patient.updatePatient=function(req,res,next){
    console.log(req.body);
    const full_name = req.body.full_name;
    if (!full_name) {
        return res.status(400).send('Full name cannot be null.');
    }
    const gender = req.body.gender;
    const allergies = req.body.allergies;
    const patient_id =req.params.id;
    var sql = 'call updatePatient(?,?,?,?)';
    db.query(sql, [full_name,gender,allergies,patient_id], function(err, patientData) {
        if (err) {
            return next(err);
        }
        res.redirect('/patientList');
    });
};
Patient.deletePatient=function(req,res,next){
    
}


module.exports = Patient;