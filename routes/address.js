var express = require('express');
var router = express.Router();
var Pgb = require('pg-bluebird');
var pgb = new Pgb();

var conString = "postgres://bobafett:clonesrule@boba1.ctmyr4ltnbl1.ap-southeast-2.rds.amazonaws.com/bobadata1";

router.get('/',function(req,res,next){
  res.render('address',{});
  next();
});
/* GET address endpoint */
router.get('/query', function(req, res, next) {
  var input = req.query.address;

  console.log("processing " + JSON.stringify(req.query));
  console.log("input is: " + input);
  var pgcn;
  if(!("connect" in pgb)){
    res.end("pgb has no connect function");
    return;
  }
  pgb.connect(conString)
  .then(function(connection){
    pgcn = connection;
    var querystring = "select na.address, na.streetname, na.streettypeabbrev,na.zip from normalize_address('"+input+"') as na;";
    return pgcn.client.query(querystring)
  })
  .then(function(result){
    pgcn.done();
    var row = result.rows[0];
    res.send({input:input,address:row});
  })
  .catch(function(error){
    res.send("problem happened: " + error.message);
  })
  next();
});

module.exports = router;
