var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = './public/data/table.json';
var tableStatus = JSON.parse(fs.readFileSync(file));
var key = 'hello';

module.exports = router;
