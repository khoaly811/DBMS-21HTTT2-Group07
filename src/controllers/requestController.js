const Dentist = require('../models/dentists');
const Clinic = require('../models/clinics')

exports.processBooking = function (req, res, next) {
  Clinic.getAll(req, res, next)
}

exports.showDentist = function (req, res, next) {
  Dentist.getAll(req, res, next)
}