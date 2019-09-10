const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: String,
  github: String,
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: String,
      from: {
        type: Date,
        required: true,
      },
      to: Date,
      current: {
        type: Boolean,
        default: false,
      },
      description: String,
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      teachers: [String],
      from: {
        type: Date,
        required: true,
      },
      to: Date,
      current: {
        type: Boolean,
        default: false,
      },
      description: String,
    },
  ],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', profileSchema);
