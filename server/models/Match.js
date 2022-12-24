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
    seatsStatus: { // Can be derived from the stadium.
      type: Array, // 2D array (rows x seats per row) initialized with 0's.
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