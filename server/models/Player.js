const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  jerseyNumber: {
    type: Number,
    min: 0,
    max: 99
  },
  handedness: {
    type: String,
    enum: {
      values: ['left', 'right'],
      message: '{VALUE} is not supported. Handedness must be: left or right'
    }
  },
  positions: {
    type: String,
    enum: {
      values: ['lw', 'c', 'rw', 'ld', 'rd', 'g'],
      message: '{VALUE} is not supported. Position must be: lw, c, rw, rd, ld, or g'
    }
  },
  seasons: {
    season: {
      type: Schema.Types.ObjectId,
      ref: 'Season'
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    },
  },
}, {
  timestamps: true
});

const Player = model('Player', playerSchema);
module.exports = Player;
