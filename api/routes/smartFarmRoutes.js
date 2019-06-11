module.exports = function(app) {
    
    const queries = require('../controllers/queries');

    app.get('/getFarmSensors', queries.getFarmSensors);
    app.post('/getModuleNameByMACAdrress', queries.getModuleNameByMACAddress);

    app.post('/getDataByDate', queries.getDataByDate);
    app.post('/getTempDataByDate', queries.getTempDataByDate)
}