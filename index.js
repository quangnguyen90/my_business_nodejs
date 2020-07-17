const express = require('express');
const app = express();
const port = 3000;
var router1 = require('./apiRouter.js');

app.get('/', (req, res) => res.send('Hello World!'));

// add api
app.use('/api/v1', router1);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))