-- use `adb_nhakhoa`;
-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_addTreatment(
--     IN dentist_id_param VARCHAR(9),
--     IN assistant_id_param VARCHAR(9),
--     IN patient_id_param VARCHAR(9),
--     IN description_param VARCHAR(255),
--     IN status_param VARCHAR(50)
-- )
-- BEGIN
--     DECLARE latest_id INT;
--     DECLARE new_treatment_id VARCHAR(9);

--     -- Find the latest TREATMENT_ID
--     SELECT MAX(CAST(SUBSTRING(TREATMENT_ID, 4) AS SIGNED)) INTO latest_id
--     FROM TREATMENT;

--     -- Increment the latest ID to generate a new TREATMENT_ID
--     SET new_treatment_id = CONCAT('TRE', LPAD(latest_id + 1, 6, '0'));

--     -- Insert data into the TREATMENT table
--     INSERT INTO TREATMENT (
--         TREATMENT_ID,
--         DENTIST_ID,
--         ASSISTANT_ID,
--         PATIENT_ID,
--         DESCRIPTION,
--         STATUS
--     ) VALUES (
--         new_treatment_id,
--         dentist_id_param,
--         assistant_id_param,
--         patient_id_param,
--         description_param,
--         status_param
--     );
-- END $$
--===================================================================================================================================================
-- DELIMITER 

-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_editTreatmentAndAppointment(
--     IN treatment_id_param VARCHAR(9),
--     IN new_description_param VARCHAR(255),
--     IN new_status_param VARCHAR(50),
--     IN new_appointment_date_param DATE,
--     IN new_appointment_shift_param VARCHAR(10)
-- )
-- BEGIN
--     -- Update DESCRIPTION and STATUS in the TREATMENT table
--     UPDATE TREATMENT
--     SET
--         DESCRIPTION = new_description_param,
--         STATUS = new_status_param
--     WHERE
--         TREATMENT_ID = treatment_id_param;

--     -- Update APPOINTMENT_DATE and APPOINTMENT_SHIFT in the APPOINTMENT table
--     UPDATE APPOINTMENT
--     SET
--         APPOINTMENT_DATE = new_appointment_date_param,
--         APPOINTMENT_SHIFT = new_appointment_shift_param
--     WHERE
--         TREATMENT_ID = treatment_id_param
--         AND APPOINTMENT_ID = 'APP01';
-- END $$

-- DELIMITER ;

--===================================================================================================================================================

-- DELIMITER $$

-- CREATE PROCEDURE sp_editTreatmentAndAppointment(
--     IN treatment_id_param VARCHAR(9),
--     IN new_description_param VARCHAR(255),
--     IN new_status_param VARCHAR(50),
--     IN new_appointment_date_param DATE,
--     IN new_appointment_shift_param VARCHAR(10)
-- )
-- BEGIN
--     -- Update DESCRIPTION and STATUS in the TREATMENT table
--     UPDATE TREATMENT
--     SET
--         DESCRIPTION = new_description_param,
--         STATUS = new_status_param
--     WHERE
--         TREATMENT_ID = treatment_id_param;

--     -- Update APPOINTMENT_DATE and APPOINTMENT_SHIFT in the APPOINTMENT table
--     UPDATE APPOINTMENT
--     SET
--         APPOINTMENT_DATE = new_appointment_date_param,
--         APPOINTMENT_SHIFT = new_appointment_shift_param
--     WHERE
--         TREATMENT_ID = treatment_id_param
--         AND APPOINTMENT_ID = 'APP01';
-- END $$

-- --===================================================================================================================================================

-- USE `adb_nhakhoa`;
-- DELIMITER $$

-- CREATE PROCEDURE sp_addMedicineInPrescription(
--     IN prescription_id_param VARCHAR(9),
--     IN medicine_id_param VARCHAR(9),
--     IN quantity_param INT
-- )
-- BEGIN
--     -- Insert data into MEDICINE_IN_PRESCRIPTION table
--     INSERT INTO MEDICINE_IN_PRESCRIPTION (
--         PRESCRIPTION_ID,
--         MEDICINE_ID,
--         QUANTITY
--     ) VALUES (
--         prescription_id_param,
--         medicine_id_param,
--         quantity_param
--     );
-- END $$

-- DELIMITER ;

-- --===================================================================================================================================================


