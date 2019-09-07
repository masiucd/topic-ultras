const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = Schema({});

module.exports = mongoose.model('Post', postSchema);
