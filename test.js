const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('json space', 2);

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'smdb.kku.ac.th',
    user: 'coeadmin',
    password: '1q2w3e4r@coeadmin',
    database: 'smart_farm',
    port: '1107',
});


connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
});

connection.end();
// connection.query('select * from farm_sensor', function (err, result) {
//     if(err) throw err;
//     result.forEach(element => {
//         console.log(element.farm_id);
//     });
//     console.log("Query successful!");
// });