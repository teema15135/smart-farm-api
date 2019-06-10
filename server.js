const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./api/controllers/database');
const routes = require('./api/routes/smartFarmRoutes');
const queries = require('./api/controllers/queries');
const dateTime = require('node-datetime');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('json space', 2);
app.use(database.connect);

routes(app);

app.listen(8000, function() {
    console.log('Start api server on port 8000');
});