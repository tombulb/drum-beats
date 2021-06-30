const express = require('express');
const app = express();
const logger = require('./middlewares/logger.js');
const port = 8080;
const errorHandler = require('./middlewares/error_handler.js');
// const beatsController = require('./controllers/beats_controller.js');
var session = require('express-session');
const { request } = require('express');

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Access the session as req.session
app.get('/', (req, res, next) => {
  if (req.session.user_id) {
    console.log('works');
  } else {
    req.session.user_id = 1
    res.end('welcome to the session demo. refresh!')
  }
  console.log(req);
})

app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
})

app.use(logger);

app.use(express.static('client'));

app.use(express.json());

// app.use('/api/beats', beatsController);

app.use(errorHandler);
