var jwt    = require('jsonwebtoken');
var app = require('../../server');
var User   = require('../models/user');
var userController = require('./user');


exports.createUser = function(req, res) {
    var email = req.body.email;
    var password = userController.cryptPassword(req.body.password);
    var isPro = req.body.isPro;

    // create a sample user
    var newUser = new User({
        email: email,
        hash: password.hash,
        salt: password.salt,
        admin: false,
        isPro: isPro
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
    if (secret_access != app.get('secret_access_create_admin')) return res.status(405).send({ auth: false, message: 'No allowed' });

    // create a sample user
    var newAdmin = new User({
        email: email,
        hash: password.hash,
        salt: password.salt,
        admin: true,
        isPro: false

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
    var email = req.body.email;
    var password = req.body.password;

    // find the user
    User.findOne({
        email: email
    }, function(err, user) {

        if (err) {
            console.log(err);
            res.status(500).json(err);
        }

        if (!user) {
            res.json({ success: false, message: { email : 'Email incorrect', password : false }  });
        } else if (user) {
            // check if password matches
            if (!userController.checkPassword(password, user.hash, user.salt)) {
                res.json({ success: false, message: { email : false, password : 'Mot de passe incorrect' }  });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    user_id: user._id,
                    admin: user.admin,
                    isPro: user.isPro
                };

                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    isAdmin: user.admin,
                    isPro: user.isPro
                });
            }
        }

    });
};
