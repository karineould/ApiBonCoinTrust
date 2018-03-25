var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Create user schema
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "L'email doit être renseigné"],
        match: [/\S+@\S+\.\S+/, 'Format email invalide'],
        index: true
    },
    nom: {
        type: String,
        required: [true, "Le nom doit être renseigné"]
    },
    admin: Boolean,
    hash: String,
    salt: String,
    isPro: {
        type: Boolean,
        required: [true, "Veuillez saisir s'il est pro ou non"]
    },
}, {timestamps: true});

//Check validation on fields
UserSchema.plugin(uniqueValidator, {message: 'Email existe déjà'});

module.exports = mongoose.model('User', UserSchema);
