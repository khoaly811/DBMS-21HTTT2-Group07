const db = require('../models/db');

const login = function(req, res, next){
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT username, password, role FROM accounts where username = ? AND password = ?;', [username, password], function(err, account){
        if(err){
            next(err);
        } else {
            console.log(account[0]);
            if (account[0].role === 'admin'){
                // req.session.account.username = account.username;
                // res.session.account.role = 'admin';
                res.status(200).json(account[0]);
                res.redirect('/bookingAppointment');
            }
            else if(account[0].role === 'dentist'){
                // req.session.account.username = account.username;
                // res.session.account.role = 'dentist';
                res.status(200).json(account[0]);
                res.redirect('/bookingAppointment');
            }
            else if(account[0].role === 'staff') {
                // req.session.account.username = account.username;
                // res.session.account.role = 'staff';
                res.status(200).json(account[0]);
                res.redirect('/bookingAppointment');
            }
            else {
                // req.session.account.username = account.username;
                // res.session.account.role = 'patient';
                res.status(200).json(account[0]);
                res.redirect('/bookingAppointment');
            }
        }
    });
}

const verify = function(req, res){
    if(!req.session.username){
        return res.status(401).json({msg: "Please log in to your account!"});
    }
    const username = req.session.username;
    db.query('SELECT username, password, role FROM accounts where username = ?;', [username], function(err, account) {
        if(err){
            return res.status(404).json({msg: "Account don't exist!"}); 
        } else {
            res.render('login');
            res.status(200).json(account);
        }
    })
}


const logout = function(req, res) {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Logout failed!"});
        res.status(200).json({msg: "Logout success!"})
    });
}

module.exports = { login, verify, logout };