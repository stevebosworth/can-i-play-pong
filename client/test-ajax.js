var http = require('http');

var time = new Date();
var table = {};

table.formattedTime = time.getDay() + '-' + time.getMonth() + '-' + time.getFullYear() + ' @' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
table.key = 'hello';
table.status = false;
table.ts = time;
table.eventType = 'start';

updateTable(table);

function updateTable(table) {
  var options = {
    host: 'localhost',
    port: '3000',
    path: '/table',
    method: 'POST',
    headers: {
          "Content-Type": "application/json"
      }
  };

  var update = JSON.stringify(table);
  var req = http.request(options, callback);

  // write the request parameters
  req.write(update);
  req.end();

  function callback (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  }
}
