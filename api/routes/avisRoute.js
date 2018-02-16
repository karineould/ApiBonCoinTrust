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

//get one avis by annonce
router.get('/annonces/:id', function(req, res) {
    avisController.findOneByAnnonce(req, res)
});

//get all avis by client
router.get('/clients', function(req, res) {
    avisController.findAllByClient(req, res)
});

//get one avis by client
router.get('/clients/:id', function(req, res) {
    avisController.findOneByClient(req, res)
});

//create avis
router.put('/createAvis', function(req, res) {
    avisController.createAvis(req, res)
});

module.exports = router;
