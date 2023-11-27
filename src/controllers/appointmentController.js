const appointmentModel = require('../models/appointments');



exports.appointList = function(req, res, next) { 
    appointmentModel.appointList(req,res,next);
}

exports.appointmentDetail = function(req, res, next) { 
    appointmentModel.appointmentDetail(req,res,next);
}
 
