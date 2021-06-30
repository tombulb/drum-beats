const express = require('express');
const app = express();
// const logger = require('./middlewares/logger.js');
const port = 8080;
// const errorHandler = require('./middlewares/error_handler.js');
// const beatsController = require('./controllers/beats_controller.js');



app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
})

// app.use(logger);

app.use(express.static('client'));

app.use(express.json());

// app.use('/api/beats', beatsController);

// app.use(errorHandler);
