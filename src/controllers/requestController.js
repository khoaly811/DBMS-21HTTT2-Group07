const Dentist = require('../models/dentists');
const DateAppointment = require('../models/dates');
const Treatment = require('../models/treatments')

const dentist_list = []

Dentist.getAll(function (err, dentists) {
  if (err)
    res.send(err);

  dentists.forEach(dentist => {
    dentist_list.push(dentist)
  });
});


exports.processBooking = function (req, res) {
  const clinics = ['1', '2', '3', '4', '5'];
  const treatments = ['Nho rang', 'Tram rang', 'Thay rang'];
  const dentists = [].concat(dentist_list)
  res.render('bookAppointment', { clinics: clinics, treatments: treatments, dentists: dentists })
}