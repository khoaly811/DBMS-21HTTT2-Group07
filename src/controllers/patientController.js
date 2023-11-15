const patientModel = require('../models/patients');

// exports.listPatient = function(req, res, next) {
//     let sql = `SELECT * FROM patient LIMIT 5`;
//     patientModel.query(sql, function(err, data) {
//         if (err) {
//             return next(err);
//         }
//         console.log(data);
//         res.render('patientList', { patientData: data });
//     });
// };
exports.listPatient = function(req,res,next){
    patientModel.listPatient(req,res,next);
}

exports.listPatientPro = function(req,res,next){
    patientModel.listPatientPro(req,res,next);
}
exports.treatListperPatient = function(req,res,next){
    patientModel.treatListperPatient(req,res,next);
}
exports.treatmentDetail = function(req,res,next){
    patientModel.treatmentDetail(req,res,next);
}
