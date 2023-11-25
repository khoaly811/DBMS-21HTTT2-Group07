const Account = require("../models/accounts");
const { extractUsernameAndRole } = require('./accounts');

exports.roleAuth = async (req, res) => {
  const username = req.body.username;
  const password = 12345678;console.log(username, password);
  try {
    const account = await Account.findOneByUsername(username);
    if (account) {
      // Check the password here (use a proper authentication mechanism)
      if (password) {
        req.session.user = extractUsernameAndRole(account);
        switch (req.session.user.role) {
          case 'admin':
            res.redirect('/admin');
            break;
          case 'dentist':
            res.redirect('/patient');
            break;
          case 'staff':
            res.redirect('/staff');
            break;
          case 'patient':
            res.redirect('/patientList');
            break;
          default:
            res.status(401).send('Invalid role');
        }
    } else {
            res.status(401).send('Username or password is incorrect');
          }
        } else {
          res.status(401).send('Username or password is incorrect');
        }
      } catch (err) {
        console.error('From auth', err);
        res.status(400).send(err.message);
      }
    };