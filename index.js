const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routers/account.js');
const authRouter = require('./routers/auth.js');
const userRouter = require('./routers/user.js');
const jwt = require('jsonwebtoken');
const AccountModel = require('./models/account.js');
//CORS middleware
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
// Config server port
const port = 3000;

app.get('/index', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/demo-cookie', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'demo-cookie.html'))
});

app.get('/home', (req, res, next) => {
    var token = req.cookies.token;
    var decodeToken = jwt.verify(token, 'secret_password_here');
    AccountModel.find({ _id: decodeToken._id})
    .then(data => {
        if (data.length == 0) {
            return res.redirect("/login");
        } else {
            if (data[0].role == 2) {
                next();
            } else {
                return res.redirect("/login");
            }
        }
    })
}, (req, res, next) => {
    res.sendFile(path.join(__dirname, 'home.html'))
});

app.post("/edit", (req, res, next) => {
    var token = req.headers.cookie.split("=")[1];
    var decodeToken = jwt.verify(token, 'secret_password_here');
    AccountModel.find({ _id: decodeToken._id})
    .then(data => {
        if (data.length == 0) {
            return res.json({
                error: true,
                message: "NOT FOUND"
            });
        } else {
            if (data[0].role == 2) {
                next();
            } else {
                return res.json({
                    error: true,
                    message: "NOT PERMISSION"
                });
            }
        }
    })
}, (req, res, next) => {
    res.json('Edit ok');
})

// GET Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'))
});

app.get('/', (req, res) => res.send('Hello World!'));

// add api of User
app.use('/api/users', userRouter);

// add api of Account
app.use('/api/account', accountRouter);

// add router of Auth
app.use('/auth', authRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))