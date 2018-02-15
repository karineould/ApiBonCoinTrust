var jwt    = require('jsonwebtoken');
var app = require('../../server');
var User   = require('../models/user');
var userController = require('./userController');


exports.createUser = function(req, res) {
    var email = req.body.email;
    var password = userController.cryptPassword(req.body.password);

    // create a sample user
    var newUser = new User({
        email: email,
        password: password,
        admin: false
    });

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
    var password = userController.cryptPassword(req.body.password);

    if (!secret_access) return res.status(401).send({ auth: false, message: 'No secret token provided.' });
    if (secret_access != 'secret_access') return res.status(405).send({ auth: false, message: 'No allowed' });

    // create a sample user
    var newAdmin = new User({
        email: email,
        password: password,
        admin: true
    });

    // save the sample user
    newAdmin.save(function(err, result) {
        if (err){
            res.status(400).json(err);
        }

        console.log('Admin saved successfully');
        res.json({ admin: result._id});
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
            if (userController.checkPassword(req, user.password, user.salt)) {
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
