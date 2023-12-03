const Accounts = require("../models/accounts");

const verifyAccount = async(req, res, next) => {
    if (!req.session.username){
        return res.status(401).json({msg: "Please log in to your account!"});
    }
    const account = await Accounts.findOne({
        where: {
            username: req.session.username
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    req.username = account.username;
    req.role = account.role;
    next();
}

const adminOnly = async(req, res, next) => {
    const account = await Accounts.findOne({
        where: {
            username: req.session.username
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    if (account.role !== "admin") return res.status(403).json({msg: "Admin authentication failed"});
    next();
}

const dentistOnly = async(req, res, next) => {
    const account = await Accounts.findOne({
        where: {
            username: req.session.username
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    if (account.role !== "dentist") return res.status(403).json({msg: "Dentist authentication failed"});
    next();
}

const staffOnly = async(req, res, next) => {
    const account = await Accounts.findOne({
        where: {
            username: req.session.username
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    if (account.role !== "staff") return res.status(403).json({msg: "Staff authentication failed"});
    next();
}

const patientOnly = async(req, res, next) => {
    const account = await Accounts.findOne({
        where: {
            username: req.session.username
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    if (account.role !== "patient") return res.status(403).json({msg: "Patient authentication failed"});
    next();
}

module.exports = { verifyAccount, adminOnly, dentistOnly, staffOnly, patientOnly }