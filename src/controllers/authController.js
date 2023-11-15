const Account = require("../models/accounts");

exports.roleAuth = async (req, res) => {
    const username = req.body.username;
    const password = 12345678;
    console.log(username, password);

    Account
    .findOne({ username: username})
    .then(account => {
        if (account) {
            req.session.user = {};
            req.session.user.username = account.username;
            // res.set('Set-Cookie', 'sessionID=' + req.sessionID);
            const firstTwoWords = account.username.split(' ').slice(0, 2);
            
            if (firstTwoWords === 'ADM') {
                // req.session.user.role = 'dentist';
                res.redirect('/admin');
            }
            else if (firstTwoWords === 'DEN') {
                // req.session.user.role = 'dentist';
                res.redirect('/dentist');
            }
            // else if (account.username === '') {
            //     req.session.user.role = 'staff';
            //     res.redirect('/staff');
            // }
            else if  (firstTwoWords === 'ST') {
                // req.session.user.role = 'dentist';
                res.redirect('/staff');
            }
            else {
                //req.session.user.role = 'patient';
                res.redirect('/patient');
                // console.log(req.sessionID);
                // res.send('Logged in');
            }
        }
        else {
            throw new Error('Username or password is incorrect');
        }
    })
    .catch(err => {
        console.error('From auth', err);
        res.status(400).send(err.message);
    })
}