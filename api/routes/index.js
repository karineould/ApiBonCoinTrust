var express = require('express');
var router = express.Router();

// api Routes
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/');
});

module.exports = router;
