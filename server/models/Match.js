const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    firstTeam: {
      type: String,
      required: true,
    },
    secondTeam: {
      type: String,
      required: true,
    },
    matchVenue: {
      type: String,
      required: true
    },
    seatsStatus: {
      type: Array, // 2D array of 0s and 1s to represent the reserved seats of the stadium.
      required: true,
    },
    date: {
      type: Date,
      required: true
    },
    mainReferee: {
      type: String,
      required: true
    },
    firstLinesMan: {
      type: String,
      required: true
    },
    secondLinesMan: {
      type: String,
      required: true
    },
  }, {
  timestamps: true
}
);

module.exports = mongoose.model('Match', matchSchema);