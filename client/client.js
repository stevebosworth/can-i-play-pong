var http = require('http');
var five = require("johnny-five"),
  board, motion;
var table = {
  "key": "hello", "status": false
};

board = new five.Board();

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  motion = new five.IR.Motion(7);

  // Inject the `motion` hardware into
  // the Repl instance's context;
  // allows direct command line access
  this.repl.inject({
    motion: motion
  });

  // Pir Event API

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function(err, ts) {
    console.log("calibrated", ts);
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function(err, ts) {
    table.status = true;
    updateTable(table);
    console.log("motionstart", ts);
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function(err, ts) {
    table.status = false;
    updateTable(table);
    console.log("motionend", ts);
  });
});

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


