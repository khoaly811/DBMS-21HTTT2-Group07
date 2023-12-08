const db = require("./db");

const Request = function(request_m){
    this.request_id = request_m.request_id;
    this.patient_id = request_m.patient_id;
    this.send_date = request_m.send_date;
    this.wish_date = request_m.wish_date;
    this.notes = request_m.notes;
};

Request.newRequest = function (req, res, next) {
    let today = new Date()
    let today_date = today.getDate()
    let today_month = today.getMonth()
    let today_year = today.getFullYear()
    let currentDate = today_year + '-' + today_month + '-' + today_date
    db.query("call sp_insert_request(?,?,?)", [req.session.username, currentDate, req.session.appointment_date]);
}