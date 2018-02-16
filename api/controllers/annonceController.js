const lbc = require('leboncoin-client');
var Annonce   = require('../models/annonce');

exports.listAll = function(req, res) {
    var is_pro = res.locals.isPro;
    if (is_pro) {
        var startPage = req.query.pageStart;
        var endPage = req.query.pageEnd;

        var query = {
            query: req.query.search,
            region_or_department: 'ile_de_france',
            sellers: 'professionnels',
            sort: 'date',
            titles_only: false,
            urgent_only: false
        };

        lbc.search(query, startPage, endPage)
            .then(function(items) {
                console.log(items);
                res.send(items);
            }, function(error) {
                res.send(error);
            });

    } else {
        Annonce.find({}, function(err, annonces) {
            if (err) res.json(err);
            res.json(annonces);
        });
    }

};

exports.createAnnonce = function(req, res) {
    var is_pro = res.locals.isPro;
    var owner = res.locals.user_id;

    if (is_pro) {
        var id = parseInt(req.params.id);

        lbc.get(id)
            .then(function (item) {
                // create a sample avis
                var newAnnonce = new Annonce({
                    annonce_id: item.id,
                    title: item.title,
                    url: item.url,
                    category: item.category,
                    location: item.location,
                    price: item.price,
                    date: item.date,
                    images: item.images,
                    owner: owner
                });

                // save the sample annonce
                newAnnonce.save(function (err, result) {
                    if (err) {
                        res.status(400).json(err);
                    }

                    console.log('Annonce saved successfully');
                    res.json({annonce: result.annonce_id});
                });
            }, function (error) {
                res.status(400).json(error);
            });
    } else {
        res.sendStatus(403);
    }
};

exports.detail = function(req, res) {
    var id = parseInt(req.params.id);

    lbc.get(id)
        .then(function(item) {
            res.send(item);
        }, function(error) {
            res.send(error);
        });
};

exports.findAllByPro = function(req, res) {
    var id = res.locals.user_id;
    Annonce.find({'owner': id}, function(err, annonces) {
        if (err) res.json(err);
        res.json(annonces);
    });
};

// exports.read_a_task = function(req, res) {
//     Task.findById(req.params.taskId, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.update_a_task = function(req, res) {
//     Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.delete_a_task = function(req, res) {
//
//
//     Task.remove({
//         _id: req.params.taskId
//     }, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'Task successfully deleted' });
//     });
// };
//
