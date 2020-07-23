const express = require('express');
var router = express.Router();
const AccountModel = require('../models/account.js');

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

// Login
router.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    AccountModel.findOne({
        username: username
    })
    .then(data => {
        if (data) {
            res.json('Login OK');
        } else {
            res.json('Wrong account')
        }
    })
    .catch(err => {
        res.status(500).json('Server Error');
    })
});

module.exports = router;