const express = require('express');
const router = express.Router();
var formidable = require('formidable');
var http = require('http');
var util = require('util');

const {Pool} = require('pg')
const db = new Pool({
  database: 'drum_beats',
  password: ' ',
})

const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


db.connect()

router.get('/', (req, res) => {
  db.query('select * from tracks order by id DESC;').then(dbRes => {
    res.json(dbRes.rows)
  })
})

router.post('/', (req, res) => {
  console.log("a file has been sent");
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
                    db.query(sql, [fields.title, track.url, fields.genre])
                      .then(dbRes => {
                        console.log(dbRes)
                        res.json({message: 'successful upload'})
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

module.exports = router