var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

//get all users
router.get('/', function(req, res) {
    userController.findAll(req, res)
});


//delete allUser
router.get('/reset', function(req, res) {
    userController.deleteAll(req, res)
});


//get all users who are clients
router.get('/client', function(req, res) {
    userController.findAllByClient(req, res)
});


//get all users who are pro
router.get('/pro', function(req, res) {
    userController.findAllByPro(req, res)
});


//get all users who are pro
router.get('/admin', function(req, res) {
    userController.findAllByAdmin(req, res)
});


//get one user
router.get('/:id',  function(req, res) {
    userController.findById(req, res)
});


// update user
router.post('/:id',  function(req, res) {
    userController.update(req, res)
});


//delete user
router.delete('/:id',  function(req, res) {
    userController.delete(req, res)
});



module.exports = router;
