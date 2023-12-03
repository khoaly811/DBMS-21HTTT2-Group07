const Accounts = require("../models/accounts");
const argon2 = require('argon2');


const getAccounts = async(req, res) => {
    try{
        const response = await Accounts.findAll({
            attribute: ['username',  'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getAccountById = async(req, res) => {
    try {
        const response = await Accounts.findOne({
            attribute: ['username',  'email', 'role'],
            where: {
                username: req.params.username
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const createAccount = async(req, res) => {
    const {username, password, email, passconfirm, role} = req.body;
    if (password !== passconfirm) return res.status(400).json({msg: "Password or Confirm password is incorrect !"});
    const hashPassword = await argon2.hash(password);
    try {
        await Accounts.create({
           username: username,
           password: hashPassword,
           email: email,
           passconfirm: passconfirm,
           role: role = 'patient'        
        });
        res.status(201).json({msg: "Signup success!"});
    } catch {
        res.status(201).json({msg: error.message});
    }
}

const updateAccount = async (req, res) => {
    const account = await Accounts.findOne({
        where: {
            username: req.params.username
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    const {username, password, email, passconfirm} = req.body;
    let hashPassword;
    if (password === "" || password === null){
        hashPassword = account.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== passconfirm) return res.status(400).json({msg: "password or confirm password is error !"});
    try {
        await Accounts.update({
           username: username,
           password: hashPassword,
           email: email,
           passconfirm: passconfirm,        
        }, {
            where: {
                username: account.username
            }
        });
        res.status(200).json({msg: "Updating success!"});
    } catch {
        res.status(400).json({msg: error.message});
    }
}

const deleteAccount = async(req, res) => {
    const account = await Accounts.findOne({
        where: {
            username: req.params.username
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    try {
        await Accounts.destroy({
            where: {
                username: account.username
            }
        });
        res.status(200).json({msg: "Deleting success!"});
    } catch {
        res.status(400).json({msg: error.message});
    }
}

module.exports = { getAccounts, getAccountById, createAccount, updateAccount, deleteAccount }
