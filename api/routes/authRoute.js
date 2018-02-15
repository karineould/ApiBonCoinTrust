var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');


//create user
router.put('/createUser', function(req, res) {
    authController.createUser(req, res)
});

//create admin
router.put('/createAdmin', function(req, res) {
    authController.createAdmin(req, res)
});

//authenticate user
router.post('/authenticate', function(req, res) {
    authController.authenticate(req, res)
});

module.exports = router;
