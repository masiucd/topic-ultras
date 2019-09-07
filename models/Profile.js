const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = Schema({});

module.exports = mongoose.model('Profile', profileSchema);
