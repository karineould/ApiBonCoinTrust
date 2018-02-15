var jwt    = require('jsonwebtoken');
var app = require('../../server');
var User   = require('../models/user');

exports.findAll = function(req, res) {
    User.find({}, function(err, users) {
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


exports.create = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    // create a sample user
    var newUser = new User({
        email: email,
        admin: false
    });
    newUser.setPassword(password);

    // save the sample user
    newUser.save(function(err, result) {
        if (err){
            res.status(400).json(err);
        }

        console.log('User saved successfully');
        res.json({ user: result._id});
    });

};

exports.createAdmin = function(req, res) {
    var secret_access = req.body.secret_access;
    var email = req.body.email;
    var password = req.body.password;

    if (!secret_access) return res.status(401).send({ auth: false, message: 'No token provided.' });
    if (secret_access != 'secret_access') return res.status(405).send({ auth: false, message: 'No allowed' });

    // create a sample user
    var newAdmin = new User({
        email: email,
        admin: true
    });
    newAdmin.setPassword(password);

    // save the sample user
    newAdmin.save(function(err, result) {
        if (err){
            res.status(400).json(err);
        }

        console.log('Admin saved successfully');
        res.json({ admin: result._id});
    });

};

exports.update = function(req, res) {
    var id = req.params.id;
    var updates = req.body;

    User.update({"_id":id}, updates,
        function (err, numberAffected) {
            if (err) return console.log(err);
            console.log('Updated %d user', numberAffected);
            return res.send(202);
        });
};


exports.delete = function(req, res){
    var id = req.params.id;
    User.remove({'_id':id },function(result) {
        return res.send(result);
    });
};

exports.deleteAll = function(req, res){
    User.remove({},function(result) {
        return res.send(result);
    });
};

exports.authenticate = function(req, res){
    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) {
            res.status(500).json(err);
        }

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.validPassword(req.body.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                console.log(payload);

                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });


                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
};

exports.checkAuth = function(req, res){

};
