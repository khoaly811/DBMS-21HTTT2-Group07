const Appointment = require('../models/appointments');

exports.listAppointment = function(req, res) {
  Appointment.listAppointment(function(err, appointment) {
    if (err)
    res.send(err);
    console.log('res', appointment);
    res.render('bookAppointment', {appointment: appointment})
  });
};