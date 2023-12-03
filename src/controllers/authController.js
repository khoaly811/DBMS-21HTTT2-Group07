const Accounts = require("../models/accounts");
const argon2 = require('argon2');

const Login = async (req, res) => {
    const account = await Accounts.findOne({
        attributes: ['username', 'password'],
        where: {
            username: req.body.username,
            password: req.body.password // sẽ sửa lại do thời gian compile lâu quá
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    console.log(res.status);
    console.log(account.password);
    console.log(req.body.password);
    const match = await argon2.verify(account.password, req.body.password);
    if (!match) return res.status(400).json({msg: "Password is incorrect"});
    req.session.username = account.username;
    const username = account.username;
    const email = account.email;
    const role = account.role;
    res.status(200).json({username, email, role});
}

const Me = async(req, res) => {
    if (!req.session.username){
        return res.status(401).json({msg: "Please log in to your account!"});
    }
    const account = await Accounts.findOne({
        attribute: ['username', 'email', 'role'],
        where: {
            username: req.session.username
        }
    });
    if (!account) return res.status(404).json({msg: "Account don't exist!"});
    res.status(200).json(account);
}

const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Logout failed!"});
        res.status(200).json({msg: "Logout success!"})
    });
}

module.exports = { Login, Me, Logout}