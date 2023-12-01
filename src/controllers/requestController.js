const Dentist = require('../models/dentists');
const Clinic = require('../models/clinics')

const dentistList = []

Dentist.getAll(function (err, dentists) {
  if (err)
    res.send(err);

  dentists.forEach(dentist => {
    dentistList.push(dentist)
  });
});

const clinicList = []

Clinic.getAll(function (err, clinics) {
  if (err)
    res.send(err);

  clinics.forEach(clinic => {
    clinicList.push(clinic)
  })
});

exports.showDentist = function (req, res) {
  const dentists = [].concat(dentistList);
  res.render('bookDentist', { dentists: dentists })
}

exports.processBooking = function (req, res) {
  const clinics = [].concat(clinicList)
  res.render('bookAppointment', { clinics: clinics });
}