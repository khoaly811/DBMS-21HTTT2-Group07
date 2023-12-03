const appointmentModel = require('../models/appointments');



exports.appointList = function(req, res, next) { 
    appointmentModel.appointList(req,res,next);
}

exports.appointmentDetail = function(req, res, next) { 
    appointmentModel.appointmentDetail(req,res,next);
}

exports.appointListAll = function(req, res, next) { 
    appointmentModel.appointListAll(req,res,next);
}

exports.navAppointmentMag = function(req, res, next) { 
    appointmentModel.navAppointmentMag(req,res,next);
}

exports.requestList = function(req, res, next) { 
    appointmentModel.requestList(req,res,next);
}
 
