const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  name: {
    type: String,
    required: [true, "Team must have a name"],
  },
  season: {
    type: Schema.Types.ObjectId,
    required: [true, "Team must belong to a season"],
    ref: 'Season'
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ],
}, {
  timestamps: true
});

const Team = model('Team', teamSchema);
module.exports = Team;
