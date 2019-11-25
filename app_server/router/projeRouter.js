var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');


router.get('/', controller.index);
router.post('/', controller.indexPost);

module.exports = router;