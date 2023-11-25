const Account = require("../models/accounts");
const { extractUsernameAndRole } = require('../models/accounts');
const { getAllUsernames } = require('../models/accounts');

exports.roleAuth = async (req, res) => {
  const username = req.body.username;

  const password = "12345678";
  const usernames = await Account.getAllUsernames();

  console.log(username);

  try {
    const account = await Account.findOneByUsernameFromArray(usernames, username);

    if (account) {
      // Check the password here (use a proper authentication mechanism)
      if (password) {
        req.session.user = extractUsernameAndRole(account);

        switch (req.session.user.role) {
          case 'admin':
            res.redirect('/admin');
            break;
          case 'dentist':
            res.redirect('/patientList');
            break;
          case 'staff':
            res.redirect('/patientList');
            break;
          case 'patient':
            res.redirect('/patientList');
            break;
          default:
            res.status(401).send('Invalid role');
        }
      } else {
        res.status(401).send('Password is incorrect');
      }
    } else {
      res.status(401).send('Username is undefined');
    }
  } catch (err) {
    console.error('From auth', err);
    res.status(400).send(err.message);
  }
};

