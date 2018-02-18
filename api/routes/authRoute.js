var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');


//create user
/*
* Création d'user avec un email unique
* un password qui est crypté
 */
router.put('/createUser', function(req, res) {
    authController.createUser(req, res)
});

//create admin
/*
* La création d'admin nécessite un email, un password ainsi qu'un secret_access
* qui est déjà prédéfini
* */
router.put('/createAdmin', function(req, res) {
    authController.createAdmin(req, res)
});

//authenticate user
/*
* Génération d'un token après authentification
* Ce token devra être nécessaire pour accéder au restant des pages
 */
router.post('/authenticate', function(req, res) {
    authController.authenticate(req, res)
});

module.exports = router;
