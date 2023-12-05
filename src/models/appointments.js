const db = require('../models/db.js');

const Appointment = function (appointment) {
  this.appointment_id = appointment.APPOINTMENT_ID;
  this.treatment_id = appointment.treatment_id;
  this.appointment_date = appointment.appointment_date;
  this.appointment_shift = appointment.appointment_shift;
  this.appointment_status = appointment.appointment_status;
};

Appointment.appointList = function (req, res, next) {
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

  let sql = "CALL sp_findAppointmentsByTreatmentID(?)";

  db.query(sql, [treatment_id], function (err, appointList) {
    if (err) {
      return next(err);
    }
    res.render("appointList", { appointList: appointList[0] });
  });
};

Appointment.appointListAll = function (req, res, next) {
  db.query("CALL sp_getAllAppointments()", function (err, data) {
    if (err) {
      return next(err);
    }
    res.render("appointListAll", { appointListAll: data[0] });
  });
};

Appointment.appointmentDetail = function (req, res, next) {
  //     USE `adb_nhakhoa`;
  // DELIMITER $$

  // CREATE PROCEDURE sp_findPrescriptionDetails(
  //     IN treatment_id_param VARCHAR(9),
  //     IN appointment_id_param VARCHAR(9)
  // )
  // BEGIN
  //     DECLARE prescription_id_var VARCHAR(9);

  //     -- Find prescription_id based on treatment_id and appointment_id
  //     SELECT PRESCRIPTION_ID
  //     INTO prescription_id_var
  //     FROM PRESCRIPTION
  //     WHERE TREATMENT_ID = treatment_id_param
  //       AND APPOINTMENT_ID = appointment_id_param
  //     LIMIT 1;

  //     -- Check if prescription_id is not null
  //     IF prescription_id_var IS NOT NULL THEN
  //         -- Select details from MEDICINE_IN_PRESCRIPTION based on the prescription_id
  //         SELECT *
  //         FROM MEDICINE_IN_PRESCRIPTION
  //         WHERE PRESCRIPTION_ID = prescription_id_var;
  //     ELSE
  //         -- If prescription_id is null, return a message or handle as needed
  //         SELECT 'No prescription found for the given treatment and appointment.' AS Message;
  //     END IF;
  // END $$

  // DELIMITER ;

  // USE `adb_nhakhoa`;
  // DELIMITER $$

  // CREATE PROCEDURE sp_findPrescriptionDetails(
  //     IN treatment_id_param VARCHAR(9),
  //     IN appointment_id_param VARCHAR(9)
  // )
  // BEGIN
  //     DECLARE prescription_id_var VARCHAR(9);

  //     -- Find prescription_id based on treatment_id and appointment_id
  //     SELECT PRESCRIPTION_ID
  //     INTO prescription_id_var
  //     FROM PRESCRIPTION
  //     WHERE TREATMENT_ID = treatment_id_param
  //       AND APPOINTMENT_ID = appointment_id_param
  //     LIMIT 1;

  //     -- Check if prescription_id is not null
  //     IF prescription_id_var IS NOT NULL THEN
  //         -- Select details from MEDICINE_IN_PRESCRIPTION and join with MEDICINE table
  //         SELECT MIP.*, M.NAME AS MEDICINE_NAME, M.DESCRIPTION AS MEDICINE_DESCRIPTION
  //         FROM MEDICINE_IN_PRESCRIPTION MIP
  //         JOIN MEDICINE M ON MIP.MEDICINE_ID = M.MEDICINE_ID
  //         WHERE MIP.PRESCRIPTION_ID = prescription_id_var;
  //     ELSE
  //         -- If prescription_id is null, return a message or handle as needed
  //         SELECT 'No prescription found for the given treatment and appointment.' AS Message;
  //     END IF;
  // END $$

  // DELIMITER ;

  const treatment_id = req.params.treatment_id;
  const appointment_id = req.params.appointment_id;

  let sqlAppointment = "CALL sp_findAppointmentByID(?, ?)";
  let sqlPrescription = "CALL sp_findPrescriptionDetails(?, ?)";

  db.query(
    sqlAppointment,
    [treatment_id, appointment_id],
    function (err, appointmentDetail) {
      if (err) {
        return next(err);
      }

      db.query(
        sqlPrescription,
        [treatment_id, appointment_id],
        function (err, prescriptionResult) {
          if (err) {
            return next(err);
          }
          res.render("appointmentDetail", {
            appointmentDetail: appointmentDetail[0],
            appointmentDetail1: appointmentDetail[1],
            prescriptionResult: prescriptionResult[0],
          });
        }
      );
    }
  );
};

module.exports = Appointment;

Appointment.navAppointmentMag = function (req, res, next) {
  // No need for a database query in this case
  res.render("navAppointmentMag");
};

Appointment.requestList = function (req, res, next) {
  db.query("CALL sp_getRequest()", function (err, data) {
    if (err) {
      return next(err);
    }
    res.render("tableRequest", { requestList: data[0] });
  });
};

function concatenateStrings(str1, str2) {
  return str1 +" "+ str2;
}


Appointment.updateAppoint = function (req, res, next) {
  console.log(req.body);
  const treatment_id = req.params.treatment_id;
  const appointment_id = req.params.appointment_id;

  const APPOINTMENT_DATE = req.body.APPOINTMENT_DATE;
  const APPOINTMENT_SHIFT = req.body.APPOINTMENT_SHIFT;
  const inputGroupSelect01 = req.body.inputGroupSelect01;
  const inputGroupSelect02 = req.body.inputGroupSelect02;
  const DESCRIPTION =concatenateStrings(inputGroupSelect01, inputGroupSelect02);

  var sql = "call sp_updateAppointmentAndTreatmentDetails(?,?,?,?,?)";
  db.query(
    sql,[appointment_id, treatment_id, APPOINTMENT_DATE, APPOINTMENT_SHIFT, DESCRIPTION],
    function (err, patientData) {
      if (err) {
        return next(err);
      }
      res.redirect("/appointListAll");
    }
  );
};

module.exports = Appointment;
