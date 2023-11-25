const appointmentModel = require('../models/appointments');


exports.listAppointment = function(req, res, next) {
    let sql = `SELECT * FROM appointment LIMIT 10`;
    appointmentModel.query(sql, function(err, data) {
        if (err) {
            return next(err);
        }
        console.log(data);
        res.render('bookAppointment', { appointmentData: data });
    });
};

