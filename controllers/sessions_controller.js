const express = require('express');
const router = express.Router();
var session = require('express-session');

router.get('/', (req, res) => {
    console.log(req.sessionID);
    if (req.session.user_id === 1) {
        res.json({authenticated: true});
    } else {
        res.json({authenticated: false})
    }
})

router.post('/', (req, res) => {
    console.log(req.body)
    if (req.body.params.username === 'demo' && req.body.params.password) {
        req.session.user_id = 1;
        res.json({authenticated: true})
    } else {
        res.json({authenticated: false})
    }
})

module.exports = router