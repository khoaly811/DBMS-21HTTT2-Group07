const mysql = require('mysql2');
require('dotenv').config();
const Account = require("../models/accounts")
const Dentist = require("../models/dentists")
const Patient = require("../models/patients")
const Staff = require("../models/staff")


exports.deleteAccount = async (req, res) => {
    try {
        await Account.deleteOne({ _id: req.params.id });
        res.redirect('/admin/account')
    } catch (error) { }
}

const updatePassword = async (username, password) => {
    try {
        await Account
            .findOneAndUpdate({ username: username }, { password: password })
            .catch((error) => {
                throw new Error('Password update failed');
            });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.resetPassword = async (req, res) => {
    // url: /reset-password/:username/:token
    const { username, token } = req.params;
    const { password1, password2 } = req.body;

    if (password1 !== password2) {
        res.send('Passwords do not match');
    }
    else {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET + username);

            if (!payload) {
                res.send('Invalid token');
            }
            else {
                const result = await updatePassword(username, password1);
                if (result) {
                    res.send('Password updated');
                }
                else {
                    res.send('Password update failed');
                }
            }

        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}