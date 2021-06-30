const express = require('express');
const router = express.Router();

const {Pool} = require('pg')
const db = new Pool({
  database: 'drum_beats',
  password: 'Jimmyhand91',
})

db.connect()

router.get('/', (req, res) => {
  db.query('select * from tracks;').then(dbRes => {
    res.json(dbRes.rows)
  })
})

module.exports = router