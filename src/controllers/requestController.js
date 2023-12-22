const Dentist = require('../models/dentists');
const Clinic = require('../models/clinics');
const Treatment = require('../models/treatments')
const Request = require('../models/requests')
const Appointment = require('../models/appointments')

exports.processBooking = function (req, res, next) {
  Clinic.getAll(req, res, next)
}

exports.showDentist = function (req, res, next) {
  Dentist.getAll(req, res, next)
}

exports.writeDownTreatment = function (req, res, next) {
  const dataArray = [req.body, req.session];

  // Log the array
  console.log("Data Array:");
  console.log(dataArray);


  Treatment.newTreatment(req, res, next)
  Request.newRequest(req, res, next)
   res.render('reviewRequest', { dataArray });
}