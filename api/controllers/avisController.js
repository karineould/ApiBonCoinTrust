var Avis   = require('../models/avis');
var Annonce   = require('../models/annonce');


exports.findAll = function(req, res) {
    Avis.find({}, function(err, avis) {
        if (err) res.json(err);
        res.json(avis);
    });
};


//
exports.findAllByAnnonce = function(req, res) {
    var id = res.params.id;

    Avis.find({'annonce': id}, function(err, avis) {
        if (err) res.json(err);
        res.json(avis);
    });
};


exports.createAvis = function(req, res) {
    var id = parseInt(req.body.id);
    var owner = res.locals.user_id;
    var note = req.body.note;
    var commentaire = req.body.commentaire;
    var annonce;

    //get the annonce
    annonce = Annonce.findOne({'annonce_id':id},function(err, result) {
        return result;
    });

    // create a sample avis
    var newAvis = new Avis({
        owner: owner,
        note: note,
        commentaire: commentaire,
        annonce: annonce.annonce_id
    });

    // save the sample avis
    newAvis.save(function(err, result) {
        if (err){
            res.status(400).json(err);
        }

        console.log('Avis saved successfully');
        res.json({ avis: result._id});
    });

};

exports.delete = function(req, res) {
    var id = req.params.id;
    Annonce.remove({'_id':id },function(err) {
        if (err) throw err;
        return res.send({deleted : id});
    });
};
