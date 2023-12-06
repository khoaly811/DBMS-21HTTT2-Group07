const db = require('../models/db');
const session = require('express-session');
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
                req.session.username = account[0].username;
                req.session.role = 'admin';
                // res.status(200).json(account[0]);
                res.redirect('/admin');
            }
            else if(account[0].role === 'dentist'){
                req.session.username = account[0].username;
                req.session.role = 'dentist';
                // res.status(200).json(account[0]);
                res.redirect('/bookingAppointment');
            }
            else if(account[0].role === 'staff') {
                req.session.username = account[0].username;
                req.session.role = 'staff';
                // res.status(200).json(account[0]);
                res.redirect('/bookingAppointment');
            }
            else {
                req.session.username = account[0].username;
                req.session.role = 'patient';
                // res.status(200).json(account[0]);
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
            // res.status(200).json(account);
        }
    })
}

const checkAuth = (req, res, next) => {
    if (req.session && req.session.username && req.session.role) {
        res.locals.username = req.session.username;
        res.locals.role = req.session.role;
    } else {
        res.locals.username = null;
        res.locals.role = null;
    }
    next();
};

const logout = function(req, res) {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Logout failed!"});
        res.status(200).json({msg: "Logout success!"})
    });
}

module.exports = { login, verify, logout, checkAuth };