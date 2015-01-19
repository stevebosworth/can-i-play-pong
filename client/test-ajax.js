var http = require('http');

var options = {
  host: 'localhost',
  port: '3000',
  path: '/table',
  method: 'POST',
  'Content-Type': 'application/x-www-form-urlencoded'
};

function callback (res) {
  // console.log('STATUS: ' + res.statusCode);
  // console.log('HEADERS: ' + JSON.stringify(res.headers));
  // res.setEncoding('utf8');
  // res.on('data', function (chunk) {
  //   console.log('BODY: ' + chunk);
  // });
}

var req = http.request(options, callback);

// write the request parameters
req.write('key=hello&status=true');
req.end();

