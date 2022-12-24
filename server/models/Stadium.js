const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stadiumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    rows: {
      type: Number,
      required: true
    },
    seatsPerRow: {
      type: Number,
      required: true
    },
  }, {
  timestamps: true
}
);

module.exports = mongoose.model('Stadium', stadiumSchema);