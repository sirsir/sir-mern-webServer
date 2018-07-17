var express = require('express');
var router = express.Router();

sirFileFolderController = require('../controllers/sirFileFolderController');

/* GET home page. */
router.post('/copyWithDirStructure', sirFileFolderController.copyWithDirStructure);

router.post('/', sirFileFolderController.index);

module.exports = router;
