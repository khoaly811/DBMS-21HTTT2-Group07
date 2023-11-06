const express = require('express');
const app = express();
const PORT = "6969";
const sql = require('mssql/msnodesqlv8');
const adminRoute = require("./routes/adminRoute");
const staffRoute = require("./routes/staffRoute");
const dentistRoute = require("./routes/dentistRoute");
const patientRoute = require("./routes/patientRoute");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
var config = {
  server : "DESKTOP-ALC9DNC\\DANGKHOALY",
  database: "ADB_NHAKHOA",
  user :'sa',
  password:"123456789", 
options :{
  trustedConnection:true,
},
driver:"msnodesqlv8",
}
sql.connect(config,function(err){
  if(err)console.log(err);
  var request = new sql.Request();
  var query = "select * from dentist";
  request.query(query,function(err,records){
      if(err)console.log(err);
      else{
        console.log(records);
      }
  });
});



app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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