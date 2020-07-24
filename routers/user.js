const express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

// Get all user by page
router.get('/', userController.getUsers);

module.exports = router;