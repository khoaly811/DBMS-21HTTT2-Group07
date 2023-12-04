const db = require('../models/db');

const login = function(req, res, next){
    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT username, password, role FROM accounts where username = ? AND password = ?;', [username, password], function(err, account){
        if(err){
            next(err);
        } else {
            console.log(account);
            if (account.role === 'admin'){
                res.render('admin');
            }
            else if(account.role === 'dentist'){
                res.render('dentistDetail');
            }
            else if(account.role === 'staff') {
                res.render('staffDetail');
            }
            else {
                res.render('bookAppointment');
            }
            req.session.username = account.username;
            res.status(200).json([account.username, account.email, account.role]);
        } 
    })
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