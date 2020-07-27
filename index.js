const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
// REDIS
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

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

// SESSION middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // if true: cookie will save sessionID with https & not send sessionID to server
        maxAge: 5000
    },
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}))

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

app.get('/demo-session', function(req, res, next) {
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
});

app.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.json('Logout ok');
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