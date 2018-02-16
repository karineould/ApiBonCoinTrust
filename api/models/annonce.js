var mongoose = require('mongoose');
var User = require('./user');

// Create annonce schema
var AnnonceSchema = new mongoose.Schema({
    annonce_id: Number,
    title: String,
    url: String,
    category: String,
    location: String,
    price: Number,
    date: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    images: [
        {
            thumbnail: String,
            medium: String,
            large: String

        }
    ]
}, {timestamps: true});


module.exports = mongoose.model('Annonce', AnnonceSchema);
