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

// create procedure sp_get_dentist(in clinicID int, in wishDate date)
// begin
// 	select distinct D.full_name
// 	from (select * from dentist where clinic_id = clinicID) as D
// 	inner join
// 	(select * from schedule where schedule_date = wishDate) as S 
// 	on D.dentist_id = S.dentist_id;
// end //

// delimiter ;