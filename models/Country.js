const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  capital: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Country', countrySchema);
