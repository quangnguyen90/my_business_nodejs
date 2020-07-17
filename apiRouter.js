const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json('router1 Root');
});

router.get('/product', (req, res) => {
    res.json('router1 Product');
});

router.get('/cart', (req, res) => {
    res.json('router1 Cart');
});

module.exports = router;