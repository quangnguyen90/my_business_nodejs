const AccountModel = require('../models/account.js');
const jwt = require('jsonwebtoken');

module.exports.postRegister = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    AccountModel.findOne({
        username: username
    })
    .then(data => {
        if (data) {
            res.json('User existed');
        } else {
            return AccountModel.create({
                username: username,
                password: password
            });
        }
    })
    .then(data => {
        res.json('Created account ok');
    })
    .catch(err => {
        res.status(500).json('Created account fail');
    })
}

module.exports.postLogin = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    AccountModel.findOne({
        username: username,
        password: password
    })
    .then(data => {
        if (data) {
            var token  = jwt.sign({
                _id : data._id
            }, 'secret_password_here');
            res.json({
                message: 'Success',
                token: token
            });
        } else {
            res.json('Wrong account')
        }
    })
    .catch(err => {
        res.status(500).json('Server Error');
    })
}