var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('jsRunner', { 
    title: 'Javascript Task Runner', 
    serverStatus: req.serverStatus
  });
});

module.exports = router;
