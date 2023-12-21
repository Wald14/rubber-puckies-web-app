const { Schema, model } = require('mongoose');

const seasonSchema = new Schema({
  startDate: {
    type: Date,
    required: [true, "Start date needed, got {VALUE}"],
  },
  seasonType: {
    type: String,
    enum: {
      values: ['winter', 'spring', 'summer', 'fall'],
      message: '{VALUE} is not supported. Season type must be: winter, spring, summer, or fall'
    },
    required: [true, "Season type needed"],
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    },
  ]

}, {
  timestamps: true
});

const Season = model('Season', seasonSchema);
module.exports = Season;
