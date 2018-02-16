var mongoose = require('mongoose');
var Annonce = require('./annonce');

// Create user schema
var AvisSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: Number, enum : [ 0, 1, 2, 3, 4, 5 ] },
    commentaire: String,
    annonce: { type: mongoose.Schema.Types.ObjectId, ref: 'Annonce' }
}, {timestamps: true});


module.exports = mongoose.model('Avis', AvisSchema);
