
const fs = require("fs");


exports.patientList = async (req, res) => {
  // <-- Add 'async' here
  try {
   

    res.render("patientList", {});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};