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
    let sql = `SELECT * FROM patient WHERE PATIENT_ID = ${IDuser}`;
    let sql2 = `SELECT SUM(INVOICE.PAID_FEE) AS totalPaidFee
    FROM TREATMENT
    JOIN INVOICE ON TREATMENT.TREATMENT_ID = INVOICE.TREATMENT_ID
    WHERE TREATMENT.PATIENT_ID = ${IDuser}`;
    let sql3 = `SELECT COUNT(DISTINCT TREATMENT_ID) AS treatmentCount
                FROM TREATMENT
                WHERE PATIENT_ID = ${IDuser}`;

    
                db.query(sql, function(err, data) {
                    if (err) {
                        return next(err);
                    }
            
                    db.query(sql2, function(err2, data2) {
                        if (err2) {
                            return next(err2);
                        }
            
            
                        db.query(sql3, function(err3, data3) {
                            if (err3) {
                                return next(err3);
                            }
            
            
                            // Render with patient data, treatment data, and treatment count
                            res.render('patientProfile', { patientData: data, treatmentData: data2, treatmentCount:data3 });
                        });
                    });
                });
};



module.exports = Patient;