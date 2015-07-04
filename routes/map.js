var express = require('express');
var router = express.Router();

var pageVariables = {
  title: 'Map',
  bodyClass: 'map'
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('map', pageVariables);
});

module.exports = router;
