const prescriptionModel = require('../models/prescriptions');

// exports.prescriptionList = function(req, res, next) {
//     res.render('prescriptionList');
// };

exports.prescriptionList = function(req,res,next){
    prescriptionModel.prescriptionList(req,res,next);
}