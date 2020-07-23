const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const accountRouter = require('./routers/account.js');
const authRouter = require('./routers/auth.js');
const AccountModel = require('./models/account.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
// Config server port
const port = 3000;

// Each item per page
const PAGE_SIZE = 2;

app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
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
            AccountModel.countDocuments({}).then((total) => {
                var totalPage = Math.ceil(total / PAGE_SIZE);

                res.json({
                    totalPage : totalPage,
                    data: data
                });
            })
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

// add router of Auth
app.use('/auth', authRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))