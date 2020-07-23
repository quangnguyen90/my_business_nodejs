const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var accountRouter = require('./routers/account.js');
const AccountModel = require('./models/account.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Config server port
const port = 3000;

// Each item per page
const PAGE_SIZE = 2;

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

app.get('/users', (req, res, next) => {
    var page = req.query.page;
    if (page) {
        // get page
        page = parseInt(page);
        if (page < 1) {
            page = 1;
        }

        var skipItems = (page - 1) * PAGE_SIZE;
        AccountModel.find({})
        .skip(skipItems)
        .limit(PAGE_SIZE)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json('Server error');
        })

    } else {
        AccountModel.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json('Server error');
        })
    }
});

// add api of Account
app.use('/api/account', accountRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))