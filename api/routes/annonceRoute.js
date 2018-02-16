var express = require('express');
var router = express.Router();
var annonce = require('../controllers/annonceController');

// For
router.get('/', function(req, res) {
    return annonce.listAll(req, res);
});

// .post(bonCoin.create_a_task);

router.get('/:id', function(req, res) {
    return annonce.detail(req, res);
});

router.get('/me', function(req, res) {
    return annonce.findAllByPro(req, res);
});

router.put('/:id', function(req, res) {
    return annonce.createAnnonce(req, res);
});
//     .put(bonCoin.update_a_task)
//     .delete(bonCoin.delete_a_task);



module.exports = router;
