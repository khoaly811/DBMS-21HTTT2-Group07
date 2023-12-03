const db = require("./db.js");

const Appointment = function(appointment) {
    this.appointment_id = appointment.APPOINTMENT_ID;
    this.treatment_id = appointment.treatment_id;
    this.appointment_date = appointment.appointment_date;
    this.appointment_shift = appointment.appointment_shift;
    this.appointment_status = appointment.appointment_status;
};

Appointment.appointList = function(req, res, next) {
    const treatment_id = req.params.id;
//     USE `adb_nhakhoa`;
// DELIMITER $$

// CREATE PROCEDURE sp_findAppointmentsByTreatmentID(
//     IN treatment_id_param VARCHAR(9)
// )
// BEGIN
//     -- Select appointments from APPOINTMENT table based on given TREATMENT_ID
//     SELECT *
//     FROM APPOINTMENT
//     WHERE TREATMENT_ID = treatment_id_param;
// END $$

// DELIMITER ;

    
    let sql = 'CALL sp_findAppointmentsByTreatmentID(?)';

    db.query(sql, [treatment_id], function(err, appointList) {
        if (err) {
            return next(err);
        }
        res.render('appointList', { appointList: appointList[0] });
    });
};

Appointment.appointListAll = function(req, res, next) {
    db.query('CALL sp_getAllAppointments()', function(err, data) {
        if (err) {
            return next(err);
        }
        res.render('appointListAll', { appointListAll: data[0] });
    });
};

    Appointment.appointmentDetail = function(req, res, next) {
        const treatment_id = req.params.treatment_id;
        const appointment_id = req.params.appointment_id;
        
        console.log(treatment_id);
        console.log(appointment_id);
        // USE `adb_nhakhoa`;
        // DELIMITER $$
        
        // CREATE PROCEDURE sp_findAppointmentByID(
        //     IN treatment_id_param VARCHAR(9),
        //     IN appointment_id_param VARCHAR(9)
        // )
        // BEGIN
        //     -- Select appointment from APPOINTMENT table based on given TREATMENT_ID and APPOINTMENT_ID
        //     SELECT *
        //     FROM APPOINTMENT
        //     WHERE TREATMENT_ID = treatment_id_param AND APPOINTMENT_ID = appointment_id_param;
        // END $$
        
        // DELIMITER ;

        
        let sql = 'CALL sp_findAppointmentByID(?,?)';

        db.query(sql, [treatment_id, appointment_id], function(err, appointmentDetail) {
            if (err) {
                return next(err);
            }
            res.render('appointmentDetail', { appointmentDetail: appointmentDetail[0] });
        });
    };

    Appointment.navAppointmentMag = function(req, res, next) {
        // No need for a database query in this case
        res.render('navAppointmentMag');
    };

    Appointment.requestList = function(req, res, next) {
        db.query('CALL sp_getRequest()', function(err, data) {
            if (err) {
                return next(err);
            }
            res.render('tableRequest', { requestList: data[0] });
        });
    };
    

    module.exports = Appointment;
