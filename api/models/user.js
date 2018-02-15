var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// set up a mongoose model and pass it using module.exports
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    admin: Boolean,
    hash: String,
    salt: String,
    isPro: Boolean
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('User', UserSchema);
