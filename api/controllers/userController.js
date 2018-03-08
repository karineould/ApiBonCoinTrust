var User   = require('../models/user');
var crypto = require('crypto');


exports.findAll = function(req, res) {
    User.find({}, function(err, users) {
        if (err) return res.status(500).json(err);
        return res.json(users);
    });
};


exports.findAllByClient = function(req, res) {
    User.find({'isPro': false, 'admin': false}, function(err, users) {
        if (err) res.json(err);
        res.json(users);
    });
};


exports.findAllByPro = function(req, res) {
    User.find({'isPro': true, 'admin': false}, function(err, users) {
        if (err) res.json(err);
        res.json(users);
    });
};


exports.findAllByAdmin = function(req, res) {
    User.find({'admin': true}, function(err, users) {
        if (err) res.json(err);
        res.json(users);
    });
};


exports.findById = function(req, res) {
    var id = req.params.id;
    User.findOne({'_id':id},function(err, result) {
        return res.send(result);
    });

};

exports.update = function(req, res) {
    var id = req.params.id;

    var isAdmin = res.locals.admin;
    var user_id = res.locals.user_id;

    if(isAdmin || user_id === id){
        // updates['email'] = req.body.email;
        // updates['password'] = this.cryptPassword(req.body.password);

        var email = req.body.email;
        var password = this.cryptPassword(req.body.password);

        User.findByIdAndUpdate(id, { $set: { email: email, password: password} },
            function (err, result) {
                if (err) return console.log(err);
                console.log(result._id);
                console.log('Updated '+ result._id +' user');
                return res.sendStatus(202);
            });
    } else {
        return res.status(403).json('not allowed');
    }

};


exports.delete = function(req, res){
    var id = req.params.id;
    User.remove({'_id':id },function(err) {
        if (err) throw err;
        return res.send({deleted : id});
    });
};


exports.deleteAll = function(req, res){
    User.remove({},function(err, result) {
        if (err) throw err;
        return res.send({ deletedNb : result.n});
    });
};



exports.cryptPassword = function(password) {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return {salt: salt, hash: hash};
};


exports.checkPassword = function(req, password, salt) {
    var hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('hex');
    return password === hash;
};
