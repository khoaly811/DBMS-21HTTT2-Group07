const db = require("./db.js");

const Invoice = function(invoice){
    this.invoice_id = invoice.invoice_id;
    this.treatment_id = invoice.treatment_id;
    this.appointment_id = invoice.appointment_id;
    this.paid_fee = invoice.paid_fee;
    this.fee = invoice.fee;
    this.change = invoice.change;
    this.payment_method = invoice.payment_method;
};

Invoice.invoiceList = function(req, res, next) {
    const patientID = req.params.id;
  
    // USE `adb_nhakhoa`;
    // DELIMITER $$
    
    // CREATE PROCEDURE sp_getInvoiceByPatientID(IN patient_id VARCHAR(9))
    // BEGIN
    //     DECLARE treatment_id_var VARCHAR(9);
    
    //     -- Get Treatment_ID based on Patient_ID
    //     SELECT 
    //         TREATMENT_ID INTO treatment_id_var
    //     FROM 
    //         TREATMENT
    //     WHERE 
    //         PATIENT_ID = patient_id;
    
    //     -- Check if Treatment_ID is not null
    //     IF treatment_id_var IS NOT NULL THEN
    //         -- Get Invoice based on Treatment_ID
    //         SELECT 
    //             *
    //         FROM 
    //             INVOICE
    //         WHERE 
    //             TREATMENT_ID = treatment_id_var;
    //     ELSE
    //         -- If Treatment_ID is null, return a message or handle as needed
    //         SELECT 'No treatment found for the given patient.' AS Message;
    //     END IF;
    // END $$
    
    // DELIMITER ;
    let sql= `call sp_getInvoiceByPatientID('${patientID}')`;
    
    db.query(sql, function(err, invoiceList) {
        if (err) {
            return next(err);
        }
        console.log(invoiceList);
        res.render('invoiceList', { invoiceList: invoiceList[0] });
    });
};

module.exports = Invoice;
