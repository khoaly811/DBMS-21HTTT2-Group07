const dentistModel = require('../models/dentists');



exports.dentistList = function(req, res, next) { 
    dentistModel.dentistList(req,res,next);
}

exports.staffDetail = function(req, res, next) { 
    dentistModel.staffDetail(req,res,next);
}


exports.staffList = function(req, res, next) { 
    dentistModel.staffList(req,res,next);
}

exports.navSystemMag = function(req, res, next) { 
    dentistModel.navSystemMag(req,res,next);
}