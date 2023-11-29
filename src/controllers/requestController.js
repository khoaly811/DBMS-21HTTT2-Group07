const Dentist = require('../models/dentists');
const DateAppointment = require('../models/dates');
const Treatment = require('../models/treatments')

exports.getAllDentist = function(req, res) {
    Dentist.getAll(function(err, dentists) {
      if (err)
        res.send(err);
      res.render('bookDentist', { dentists: dentists});
    });
};

exports.getAllDateAppointment = function(req, res) {
    DateAppointment.getAll(function(err, dates) {
      if (err)
        res.send(err);
      res.send(dates);
    });
};

exports.writeDownTreatment = function(req, res) {
    // Treatment.getAll(function(err, treatments) {
    //   if (err)
    //     res.send(err);
    //   res.send(treatments);
    // });
	res.send('OK');
};

exports.getAllClinic = function(req, res) {
	const clinics = ['1', '2', '3'];
    res.render('bookAppointment', { clinics: clinics })
}

exports.getALlTreatment = function(req, res) {
	const treatments = ['Nho rang', 'Tram rang', 'Thay rang'];
	res.render('bookTreatment', { treatments: treatments })
}