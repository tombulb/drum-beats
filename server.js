const express = require('express');
const app = express();
const logger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/error_handler.js');
const port = 8080;
const { request } = require('express');
const sessionsController = require('./controllers/sessions_controller.js')
const tracksController = require('./controllers/tracks_controller.js')
const sessionCheck = require('./middlewares/session_check.js');
var session = require('express-session');

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

app.use('/api/tracks', tracksController);

app.use(errorHandler);