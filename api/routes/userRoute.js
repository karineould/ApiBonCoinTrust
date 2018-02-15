var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

//get all users
router.get('/', function(req, res) {
    userController.findAll(req, res)
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

//delete allUser
router.get('/reset', function(req, res) {
    userController.deleteAll(req, res)
});

// var query = {'username':req.user.username};
// req.newData.username = req.user.username;
// MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
//     if (err) return res.send(500, { error: err });
//     return res.send("succesfully saved");
// });


module.exports = router;
