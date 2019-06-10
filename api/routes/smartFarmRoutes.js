module.exports = function(app) {
    
    const queries = require('../controllers/queries');

    app.get('/getFarmSensors', queries.getFarmSensors);
    app.post('/getDataByDate', queries.getDataByDate);
}