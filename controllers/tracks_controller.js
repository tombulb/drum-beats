const express = require('express');
const router = express.Router();
var formidable = require('formidable');
var http = require('http');
var util = require('util');

const {Pool} = require('pg')
const db = new Pool({
  database: 'drum_beats',
  password: process.env.PG_PASSWORD
})

const cloudinary = require('cloudinary').v2;
const { createSecretKey } = require('crypto');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

db.connect()

router.get('/', (req, res) => {
  db.query('select * from tracks order by id DESC;')
    .then(dbRes => {
      res.json(dbRes.rows)
    })
})

router.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre.split('-')[0];
  db.query(`SELECT * FROM tracks WHERE genres ILIKE '${genre}%';`)
    .then(dbRes => {
      res.json(dbRes.rows)
    })
})
  
router.post('/', (req, res) => {
  console.log("A file has been sent.");
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      cloudinary
                .uploader
                .upload(files.track.path,{tags: 'metal', resource_type: 'video'})
                .then(track => {
                    console.log("Uploaded on Cloudinary at " + track.url);

                    sql = `INSERT INTO tracks 
                    (track_name, user_id, cloudinary_url, genres)
                    VALUES ($1, 1, $2, $3)`
                    db.query(sql, [fields.title.toLowerCase(), track.url, fields.genre.toLowerCase()])
                      .then(dbRes => {
                        console.log(dbRes)
                        res.json({upload: true})
                      })
                })
                .catch(err => {
                  console.log();
                  console.log("** File Upload (Promise)");
                  if (err) { console.warn(err); }
                });
      return files;
  });
})

router.delete('/:id', (req, res) => {
  db.query(`DELETE FROM tracks WHERE ID = ${req.params.id};`)
  .then(dbRes => {
    res.json({deleted: true})
  })
})

router.put('/:id', (req, res) => {
  let sql = `UPDATE tracks SET track_name = $1, genres = $2 WHERE id=$3;`
  db
  .query(sql, [req.body.trackName, req.body.trackGenre.toLowerCase(), req.params.id])
  .then(dbRes => {
    res.json({updated: true})
  })
})

router.get('/:id', (req, res) => {
  db.query(`SELECT * FROM tracks WHERE ID = ${req.params.id};`)
    .then(dbRes => {
      res.json(dbRes.rows)
    })
})

module.exports = router
