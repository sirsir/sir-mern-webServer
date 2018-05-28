var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('memos', { 
    title: 'Memos', 
    serverStatus: req.serverStatus
  });
});

module.exports = router;
