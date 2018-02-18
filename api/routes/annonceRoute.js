var express = require('express');
var router = express.Router();
var annonce = require('../controllers/annonceController');

// if isPro get all annonces of API
// else if isClient get all annonces of mongodb
router.get('/', function(req, res) {
    return annonce.listAll(req, res);
});

// get all annonces of owner
router.get('/me', function(req, res) {
    return annonce.findAllByPro(req, res);
});

// get detail of annonce
router.get('/:id', function(req, res) {
    return annonce.detail(req, res);
});

//create annonce
router.put('/:id', function(req, res) {
    return annonce.createAnnonce(req, res);
});


// get annonce by filtre
router.post('/filtre', function(req, res) {
    return annonce.findByKeywords(req, res);
});



module.exports = router;
