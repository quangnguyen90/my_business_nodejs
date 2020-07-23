const express = require('express');
var router = express.Router();
const AccountModel = require('../models/account.js');

// Get all account
router.get('/', (req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('Server error');
    })
});

// Get 1 account
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    AccountModel.findById({
        _id: id
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('Server error');
    })
});

// Add new account
router.post('/', (req, res, next) => {
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
        res.json('Add new account ok');
    })
    .catch(err => {
        res.status(500).json('Server error');
    })
});

// Update existed account
router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var newPassword = req.body.newPassword;

    AccountModel.findByIdAndUpdate(id, {
        password: newPassword
    })
    .then(data => {
        res.json('Update account ok');
    })
    .catch(err => {
        res.status(500).json('Server error');
    })
});

// Delete existed account
router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    AccountModel.deleteOne({
        _id: id
    })
    .then(data => {
        res.json('Delete account ok');
    })
    .catch(err => {
        res.status(500).json('Server error');
    })
});

module.exports = router;