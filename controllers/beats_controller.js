const express = require('express');
const router = express.Router();
const Track = require('../models/track.js');

router.get('/', (req, res) => {
    Track
        .findAll()
        .then(dbRes => {
            res.json(dbRes.rows)
        })
})

module.exports = router