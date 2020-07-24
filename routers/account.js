const express = require('express');
var router = express.Router();
const accountController = require('../controllers/account');

// Get all account
router.get('/', accountController.getAll);

// Get 1 account
router.get('/:id', accountController.detail);

// Add new account
router.post('/', accountController.postCreate);

// Update existed account
router.put('/:id', accountController.putUpdate);

// Delete existed account
router.delete('/:id', accountController.deleteAccount);

module.exports = router;