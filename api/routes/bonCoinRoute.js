var express = require('express');
var router = express.Router();
var bonCoin = require('../controllers/bonCoinController');


router.get('/', function(req, res, next) {
    return bonCoin.list_all(req, res);
});

// .post(bonCoin.create_a_task);


router.get('/:id', function(req, res, next) {
    return bonCoin.detail(req, res);
});
//     .put(bonCoin.update_a_task)
//     .delete(bonCoin.delete_a_task);


module.exports = router;
