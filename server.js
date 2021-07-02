const express = require('express');
const app = express();
const logger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/error_handler.js');
const port = 8080;
const { request } = require('express');
const sessionsController = require('./controllers/sessions_controller.js')
const tracksController = require('./controllers/tracks_controller.js')
<<<<<<< HEAD
const sessionCheck = require('./middlewares/session_check.js');
var session = require('express-session');
=======
const api_key = 414837986633473;
// const sessionCheck = require('./middlewares/session_check.js');
const session = require('express-session');
const formidable = require('formidable');
const http = require('http');
const util = require('util');
>>>>>>> desk cleared

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
})

app.use(session({ 
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false
}))

app.use(logger);

app.use(express.static('client'));

app.use(express.json());

app.use('/api/sessions', sessionsController)

<<<<<<< HEAD
app.use('/api/tracks', tracksController);

app.use(errorHandler);
=======
app.post('/api/tracks', (req, res, next) => {
  
  const form = formidable({ multiples: true });
 
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(files);
    res.json({ fields, files });
  });
  
});

// app.use('/api/tracks', tracksController);

app.use(errorHandler);
>>>>>>> desk cleared
