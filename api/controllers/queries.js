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
        endConnection(res);
      } else {
        outObj[sensorName] = rowData;
        console.log(rowData[0].upd_date);
        callback();
        endConnection(res);
      }
    }
  );
}

function endConnection(res) {
  res.locals.connection.end(function() {
    console.log('Ended connection');
  });
}

exports.getModuleNameByMACAddress = function (req, res) {
  if(!req.body.mac_address) {
    res.json({ message: 'please enter mac address on field mac_address'});
    return;
  }

  res.locals.connection.query(
    "SELECT sensor_module_name FROM smart_farm.farm_sensor where sensor_module_id = ?;",
    [req.body.mac_address],
    function (err, rows, field) {
      if(err) {
        res.json({ status: 'error' });
        endConnection(res);
        return;
      };
      console.log(field);
      res.json({ data: rows });
      res.locals.connection.end(function() {
        endConnection(res);
      });
    }
  );
}

exports.getTempDataByDate = function (req, res) {
  let data = {};

  querySensorDataFromDate(req, res, 'sensor_temperature', 'temp', data, function () {
    res.json({
      status: 'ok',
      data: data,
    });
    endConnection(res);
  });
}

exports.getDataByDate = function (req, res) {
  let data = {};
  let sensor = [];

  querySensorDataFromDate(req, res, 'sensor_temperature', 'temp', data, function () {
    querySensorDataFromDate(req, res, 'sensor_huminity', 'humidity', data, function () {
      res.json({
        status: 'ok',
        data: data
      });
      endConnection(res);
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
      endConnection(res);
    }
  );
};
