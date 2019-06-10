const mysql = require("mysql");

exports.connect = function(req, res, next) {
  console.log("database connecting...");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  function handleDisconnect() {
    res.locals.connection = mysql.createConnection({
      host: "smdb.kku.ac.th",
      user: "coeadmin",
      password: "1q2w3e4r@coeadmin",
      database: "smart_farm",
      port: "1107"
    });

    res.locals.connection.connect(function(err) {
      if (err) {
        console.log("error when connecting to db:", err);
        setTimeout(handleDisconnect, 2000);
      } else {
        console.log("Database connected!");
      }
    });

    res.locals.connection.on("error", function(err) {
      console.log("db error lost connection!");
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleDisconnect();
      } else {
        throw err;
      }
    });

    res.locals.connection.on("connection", conn => {
      conn.query('SET time_zone="+07:00";', error => {
        if (error) throw error;
        console.log("set time zone");
      });
    });
  }

  handleDisconnect();

  return next();
};
