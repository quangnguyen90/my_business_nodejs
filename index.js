const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var router1 = require('./apiRouter.js');
const AccountModel = require('./models/account.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Config server port
const port = 3000;

// Register user
app.post('/register', (req, res, next) => {
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
app.post('/login', (req, res, next) => {
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

app.get('/', (req, res) => res.send('Hello World!'));

// add api
app.use('/api/v1', router1);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))