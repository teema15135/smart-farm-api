const NUMBER_OF_QUERYING = 2;

function querySensorDataFromDate(req, res, tableName, sensorName, outObj, callback) {
  var tmpDate = req.body.date + '%';
  let queryMessage = 'SELECT * FROM ' + tableName + ' where upd_date like ? and farm_id = ' + req.body.farm_id;
  console.log(tmpDate);
  res.locals.connection.query(
    queryMessage,
    [tmpDate],
    function (err, rowData, field) {
      if (err) {
        console.log(err);
        res.json({ status: "error from " + sensorName });
        res.locals.connection.end();
      } else {
        outObj[sensorName] = rowData;
        console.log(rowData[0].upd_date);
        callback();
      }
    }
  );
}

exports.getDataByDate = async function (req, res) {
  let data = {};
  let sensor = [];

  querySensorDataFromDate(req, res, 'sensor_temperature', 'temp', data, function () {
    querySensorDataFromDate(req, res, 'sensor_huminity', 'humidity', data, function () {
      res.json({
        status: 'ok',
        data: data
      });
    });
  });
};

exports.getFarmSensors = function (req, res) {
  console.log("got req");
  res.locals.connection.query(
    "select * from farm_sensor where farm_id = ?",
    [req.query.farm_id],
    function (err, rows) {
      res.json({ data: rows });
    }
  );
};
