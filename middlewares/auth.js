const AccountModel = require('../models/account.js');
const jwt = require('jsonwebtoken');

module.exports.checkLogin = (req, res, next) => {
    // check login
    try {
        var token = req.cookies.token;
        var idUser = jwt.verify(token, 'secret_password_here');
        AccountModel.findOne({
            _id: idUser,
        })
        .then(data => {
            if (data) {
                req.data = data;
                next();
            } else {
                res.json('NOT PERMISSION');
            }
        })
        .catch(err => {

        })
    }
    catch(error) {
        res.status(500).json('Invalid Token');
    }
}

module.exports.requireLogin = (req, res, next) => {
    try {
        var token = req.cookies.token;
        var result = jwt.verify(token, 'secret_password_here');
        if (result) {
            next();
        }
    }
    catch(error) {
        return res.redirect('/login');
    }
}

const ROLE_STUDENT = 0;
const ROLE_TEACHER = 1;
const ROLE_MANAGER = 2;

module.exports.checkStudent =  (req, res, next) => {
    var role = req.data.role;
    if (role >= ROLE_STUDENT) {
        next();
    } else {
        res.json('NOT PERMISSION');
    }
}

module.exports.checkTeacher =  (req, res, next) => {
    var role = req.data.role;
    if (role >= ROLE_TEACHER) {
        next();
    } else {
        res.json('NOT PERMISSION');
    }
}

module.exports.checkManager =  (req, res, next) => {
    var role = req.data.role;
    if (role >= ROLE_MANAGER) {
        next();
    } else {
        res.json('NOT PERMISSION');
    }
}