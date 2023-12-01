const db = require("./db");

const Clinic = function(clinic){
    this.clinic_id = clinic.clinic_id;
    this.clinic_address = clinic.clinic_address;
};

Clinic.getAll = function (result) {
    db.query("Select * from CLINIC;", function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          result(null, res);
        }
    });
};

module.exports = Clinic;