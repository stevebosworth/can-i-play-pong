var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = './public/data/table.json';
var key = 'hello';

var io = require('socket.io')();

io.on('connection', function (socket) {
  socket.emit('status', {hi: 'hello'});
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

/* GET home page. */
router.get('/', function(req, res) {
  var tableStatus = JSON.parse(fs.readFileSync(file));
  res.render('index', tableStatus);
});

router.get('/table', function(req, res) {
  var tableStatus = JSON.parse(fs.readFileSync(file));
  res.json(tableStatus);
});

router.post('/table', function(req, res){
  // console.log(req.body);
  var tableUpdate = req.body;

  console.dir(tableUpdate.key);
  if(!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('status')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }


  if (tableUpdate.key === key) {
    console.log("success");
    delete tableUpdate.key;
    console.dir(tableUpdate);
    // str.status = toBoolean(tableUpdate.status);
    console.log(tableUpdate.status);
    fs.writeFileSync(file, JSON.stringify(tableUpdate));

    res.statusCode = 200;
    return res.send('Success!');
  }

  function toBoolean(key, value) {
    if (value) {
      value = true;
    } else {
      value = false;
    }

    return value;
  }
});

module.exports = router;
