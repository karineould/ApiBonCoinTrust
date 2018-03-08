var express = require('express');
var router = express.Router();
var avisController = require('../controllers/avis');


//get all avis
router.get('/', function(req, res) {
    avisController.findAll(req, res)
});

//get all avis by annonce
/*
* On récupère tous les avis sur une annonces
*/
router.get('/annonces/:id', function(req, res) {
    avisController.findAllByAnnonce(req, res)
});

//create avis
/*
* On récupère tous les avis sur une annonces
*/
router.put('/createAvis', function(req, res) {
    avisController.createAvis(req, res)
});

// update avis
/*
* On peut modifier soit la note, soit le commentaire de notre avis
*
*/
router.post('/', function(req, res) {
    avisController.update(req, res)
});


//delete avis
router.delete('/:id', function(req, res) {
    avisController.delete(req, res)
});

module.exports = router;
