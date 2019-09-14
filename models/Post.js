const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  text: {
    type: String,
    required: true,
  },
  name: String,
  avatar: String,
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
      text: {
        type: String,
        required: true,
      },
      avatar: String,

      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Post', postSchema);
