var express = require('express');
var router = express.Router();
var avisController = require('../controllers/avisController');


//get all avis
router.get('/', function(req, res) {
    avisController.findAll(req, res)
});

//get all avis by annonce
router.get('/annonces', function(req, res) {
    avisController.findAllByAnnonce(req, res)
});


//create avis
router.put('/createAvis', function(req, res) {
    avisController.createAvis(req, res)
});


//delete avis
router.delete('/:id', function(req, res) {
    avisController.delete(req, res)
});

module.exports = router;
