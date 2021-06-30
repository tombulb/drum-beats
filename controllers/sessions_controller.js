const express = require('express');
const router = express.Router();
var session = require('express-session');

router.get('/', (req, res) => {
    console.log('hello');
    if (req.query.username === 'demo' && req.query.password === 'demo') {
        res.json({login: true});
    } else {
        res.json({login: false})
    }
})

module.exports = router