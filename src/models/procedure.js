//     USE `adb_nhakhoa`;
// DELIMITER //

// CREATE PROCEDURE GetPatientInfo(IN p_IDuser INT)
// BEGIN
//     DECLARE totalPaidFee DECIMAL(10, 2);
//     DECLARE treatmentCount INT;

//     -- Get patient information
//     SELECT * FROM patient WHERE PATIENT_ID = p_IDuser;

//     -- Get total paid fee
//     SELECT SUM(INVOICE.PAID_FEE) INTO totalPaidFee
//     FROM TREATMENT
//     JOIN INVOICE ON TREATMENT.TREATMENT_ID = INVOICE.TREATMENT_ID
//     WHERE TREATMENT.PATIENT_ID = p_IDuser;

//     -- Get treatment count
//     SELECT COUNT(DISTINCT TREATMENT_ID) INTO treatmentCount
//     FROM TREATMENT
//     WHERE PATIENT_ID = p_IDuser;

//     -- Return results
//     SELECT totalPaidFee AS TotalPaidFee, treatmentCount AS TreatmentCount;
    
// END //

// DELIMITER ;
// DELIMITER  //
// create procedure updatePatient(in patname varchar(50),patgender char(1), patallergies varchar(30),IN p_IDuser char(9))
// begin
// 	update patient
// 	set 
// 		full_name=patname,
// 		gender=patgender,
// 		allergies=patallergies
// 	where
// 		patient_id=p_IDuser;
// end
// DELIMITER ;
// DELIMITER $$
// create procedure `sp_patient`()
// begin
// 	select * from patient limit 30;
// end

// DELIMITER $$

// DELIMITER //

// CREATE PROCEDURE addPatient(IN patid char(9), patname varchar(50), patdob date, patgender char(1), patallergies varchar(30))
// BEGIN
// 	DECLARE existing_count INT;

//     -- Check if the patient ID already exists
//     SELECT COUNT(*) INTO existing_count FROM patient WHERE PATIENT_ID = patid;
//     IF existing_count = 0 THEN
// 		INSERT INTO patient VALUES (patid, patname, patdob, patgender, patallergies);
// 	else
// 		SIGNAL SQLSTATE '45000'
//         SET MESSAGE_TEXT = N'Số điện thoại đã tồn tại. Vui lòng chọn số khác!';
//     END IF;
// END//

// DELIMITER ;

// delimiter //

// create procedure sp_get_dentist(in clinicID int, in wishDate char(1), in shift int)
// begin
// 	select distinct D.dentist_id, D.full_name
// 	from 
//     (select * from dentist where clinic_id = clinicID) as D
// 	inner join
// 	(select * from dentist_schedule where schedule_weekday = wishWeekday and schedule_shift = shift) as S 
// 	on D.dentist_id = S.dentist_id
//     inner join
//     (select T.dentist_id
//     from treatment as T inner join appointment as A on T.treatment_id = A.treatment_id
//     where appointment_date <> wishDate) as DS
//     on S.dentist_id = DS.dentist_id;
// end

// CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateMedicineInPrescription`(
//     IN medicine_name_param VARCHAR(255),
//     IN prescription_id_param VARCHAR(9),
//     IN new_quantity_param INT,
//     IN treatment_id_param VARCHAR(9),
//     IN appointment_id_param VARCHAR(9),
// 	IN medicine_old_param VARCHAR(255)
// )
// BEGIN
//     DECLARE medicine_id_var VARCHAR(9);
//     DECLARE prescription_id_var VARCHAR(9);


//     -- Find MEDICINE_ID based on given NAME
//     SELECT MEDICINE_ID INTO medicine_id_var
//     FROM MEDICINE
//     WHERE NAME = medicine_name_param
//     LIMIT 1;

//     -- Check if MEDICINE_ID is not null
//     IF medicine_id_var IS NOT NULL THEN
//         -- Check if the medicine already exists in MEDICINE_IN_PRESCRIPTION
//         IF EXISTS (
//             SELECT 1
//             FROM MEDICINE_IN_PRESCRIPTION
//             WHERE PRESCRIPTION_ID = prescription_id_param
//               AND MEDICINE_ID = medicine_old_param
//         ) THEN
//             -- Update MEDICINE_IN_PRESCRIPTION table
//             UPDATE MEDICINE_IN_PRESCRIPTION
//             SET
//                 QUANTITY = new_quantity_param,
//                 MEDICINE_ID = medicine_id_var
//             WHERE
//                 PRESCRIPTION_ID = prescription_id_param
//                 AND MEDICINE_ID = medicine_old_param;
//         ELSE
// 			SELECT COALESCE(MAX(PRESCRIPTION_ID), 0) + 1 INTO prescription_id_var
//             FROM PRESCRIPTION;
//             -- Insert new row in MEDICINE_IN_PRESCRIPTION table
           
// 			INSERT INTO PRESCRIPTION (PRESCRIPTION_ID, TREATMENT_ID, APPOINTMENT_ID)
// 			VALUES (prescription_id_var, treatment_id_param, appointment_id_param);
//             -- Check if the prescription already exists in PRESCRIPTION
//             IF NOT EXISTS (
//                 SELECT 1
//                 FROM MEDICINE_IN_PRESCRIPTION
//                 WHERE PRESCRIPTION_ID = prescription_id_var
//             ) THEN
//                 -- Insert new row in PRESCRIPTION table
//                  INSERT INTO MEDICINE_IN_PRESCRIPTION (PRESCRIPTION_ID, MEDICINE_ID, QUANTITY)
// 				VALUES (prescription_id_var, medicine_id_var, new_quantity_param);
//             END IF;
//         END IF;
//     ELSE
//         -- If MEDICINE_ID is null, return a message or handle as needed
//         SELECT 'No medicine found for the given name.' AS Message;
//     END IF;
// END