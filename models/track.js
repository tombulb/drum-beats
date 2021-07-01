const { Pool } = require('pg')

const db = new Pool({
  database: 'drum_beats',
  password: ' '
}) 

const Track = {
    findAll() {
      const sql = 'select * from tracks;'
      return db.query(sql)
    }
}

module.exports = Track