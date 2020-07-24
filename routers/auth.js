const express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth');
const authController = require('../controllers/auth');

// Register user
router.post('/register', authController.postRegister);

// POST Login page
router.post('/login', authController.postLogin);

router.get('/private',
    authMiddleware.requireLogin,
    (req, res, next) => {
        res.json('welcome');
});

router.get('/task',
    authMiddleware.checkLogin,
    authMiddleware.checkStudent,
    (req, res, next) => {
        res.json('ALL TASK PAGE');
});

router.get('/student',
    authMiddleware.checkLogin,
    authMiddleware.checkTeacher,
    (req, res, next) => {
        res.json('STUDENT PAGE');
});

router.get('/teacher',
    authMiddleware.checkLogin,
    authMiddleware.checkManager,
    (req, res, next) => {
        res.json('TEACHER PAGE');
});

module.exports = router;