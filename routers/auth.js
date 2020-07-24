const express = require('express');
var router = express.Router();
const AccountModel = require('../models/account.js');
const jwt = require('jsonwebtoken');

// Register user
router.post('/register', (req, res, next) => {
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
});

// POST Login page
router.post('/login', (req, res, next) => {
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
});

router.get('/private', (req, res, next) => {
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
}, (req, res, next) => {
    res.json('welcome');
});

module.exports = router;