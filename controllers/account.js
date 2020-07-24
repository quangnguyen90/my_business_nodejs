const AccountModel = require('../models/account.js');

module.exports.getAll = (req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('Server error');
    })
}

module.exports.detail = (req, res, next) => {
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
}

module.exports.putUpdate = (req, res, next) => {
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
}

module.exports.postCreate = (req, res, next) => {
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
}

module.exports.deleteAccount = (req, res, next) => {
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
}