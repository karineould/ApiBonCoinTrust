var Avis   = require('../models/avis');
var Annonce   = require('../models/annonce');
var mongoose = require('mongoose');



exports.findAll = function(req, res) {
    Avis.find({}, function(err, avis) {
        if (err) res.json(err);
        res.json(avis);
    });
};

//
exports.findAllByAnnonce = function(req, res) {
    var id = req.params.id;
    if(id){
        Avis.find({'annonce': id}, function(err, avis) {
            if (err) res.json(err);
            res.json(avis);
        });
    }
    res.status(404).json("pas d'id dans votre route");
};


exports.createAvis = function(req, res) {
    var id = parseInt(req.body.id);
    var owner = res.locals.user_id;
    var note = req.body.note;
    var commentaire = req.body.commentaire;
    // var annonce;

    //get the annonce
    Annonce.findOne({'annonce_id':id},function(err, annonce) {
        if (err){
            res.status(400).json(err);
        }
        // return result;
        if(annonce){
            avis = Avis.findOne({'annonce':id, 'owner': owner},function(err, result) {
                if(result){
                    res.status(403).json('Vous avez déjà commenté cette annonce, veuillez modifier votre avis');
                }
            });

            // create a sample avis
            var newAvis = new Avis({
                owner: owner,
                note: note,
                commentaire: commentaire,
                annonce: mongoose.Types.ObjectId(annonce.annonce_id)
            });

            // save the sample avis
            newAvis.save(function(err, result) {
                if (err){
                    res.status(400).json(err);
                }

                console.log('Avis saved successfully');
                res.json({ avis: result._id});
            });
        } else {
            res.status(400).json("Cette annonce n'existe pas");
        }

    });



};

exports.update = function(req, res) {
    var id = req.body.id;
    var note = req.body.note;
    var commentaire = req.body.commentaire;
    if(id){
        Avis.findByIdAndUpdate(id, { $set: { note: note, commentaire: commentaire }},
            function (err, result) {
                if (err) console.log(err);
                console.log('Updated '+ result._id +' avis');
                res.sendStatus(202);
            });
    }
    res.sendStatus(404);

};

exports.delete = function(req, res) {
    var id = req.params.id;
    Annonce.remove({'_id':id },function(err) {
        if (err) throw err;
        return res.send({deleted : id});
    });
};
