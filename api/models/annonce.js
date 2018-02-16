var mongoose = require('mongoose');

// Create annonce schema
var AnnonceSchema = new mongoose.Schema({
    title: String,
    url: String,
    category: String,
    location: String,
    price: Number,
    date: Date,
    images: [[String]]
}, {timestamps: true});


module.exports = mongoose.model('Annonce', AnnonceSchema);
