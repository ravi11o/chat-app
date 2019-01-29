var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Hello Express');
});

router.get('/chat', function(req, res) {
  res.render('index');
});

module.exports = router;
