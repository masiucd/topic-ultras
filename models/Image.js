const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = Schema({});

module.exports = mongoose.model('Image', imageSchema);
