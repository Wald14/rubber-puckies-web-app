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
  playoffRounds: {
    type: Number,
    min: 1,
    default: 1,
    required: true
  },
  rink: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


// Virtual getter to convert startDate to Central Time (UTC-5)
seasonSchema.virtual('startDateCentralTime').get(function () {
  const startDateUTC = this.startDate;
  const startDateCentralTime = new Date(startDateUTC.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  return startDateCentralTime;
});


const Season = model('Season', seasonSchema);
module.exports = Season;
