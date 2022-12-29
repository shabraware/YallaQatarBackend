const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    nationality: {
      type: String,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'fan'
    },
    approved: {
      type: Boolean,
    },
    // matches with row and column
    matches: [{
      match:{
        type: Schema.Types.ObjectId,
        ref: 'Match'
      }, row: {
        type: Number,
      }, seat: {
        type: Number,
      }, firstTeam: {
        type: String,
      }, secondTeam: {
        type: String,
      }, matchVenue: {
        type: String,
      },
  }],
  }, {
  timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);