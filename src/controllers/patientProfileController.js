
const fs = require("fs");


exports.patientProfile = async (req, res) => {
  // <-- Add 'async' here
  try {
   

    res.render("patientProfile", {});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};