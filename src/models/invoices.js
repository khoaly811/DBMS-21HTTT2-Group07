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


