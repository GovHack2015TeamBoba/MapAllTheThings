var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var data =[
    {
      id:1,
      title:"Map All the things",
      parent:0,
      url:""
    },
    {
      id:2,
      title:"Science",
      parent:0,
      url:""
    },
    {
      id:3,
      title:"Civics",
      parent:0,
      url:""
    },
    {
      id:4,
      title:"Other",
      parent:0,
      url:""
    },
    {
      id:5,
      title:"Different",
      parent:0,
      url:""
    },
    {
      id:6,
      title:"Foo",
      parent:2,
      url:""
    },
    {
      id:7,
      title:"Bar",
      parent:2,
      url:""
    },
    {
      id:8,
      title:"Baz",
      parent:2,
      url:""
    },
    {
      id:9,
      title:"Wibble",
      parent:3,
      url:""
    },
    {
      id:10,
      title:"Frobble",
      parent:3,
      url:""
    },
    {
      id:11,
      title:"Frodo",
      parent:4,
      url:""
    }
  ];
  var rd = {title:"Map All the Things", wizard:JSON.stringify(data)};
  res.render('index', rd);
});

module.exports = router;
