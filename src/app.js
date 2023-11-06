const express = require('express');
const app = express();
const PORT = "6969";
//const adminRoute = require("./routes/adminRoute");
const staffRoute = require("./routes/staffRoute");
const dentistRoute = require("./routes/dentistRoute");
const patientRoute = require("./routes/patientRoute");
const bodyParser = require("body-parser");
//const methodOverride = require('method-override')

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(methodOverride('_method'));
app.get('/', (req, res) => {
  res.render('login')
})
// app.use("/", adminRoute);
// app.use("/", staffRoute);
// app.use("/", dentistRoute);
// app.use("/", patientRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});