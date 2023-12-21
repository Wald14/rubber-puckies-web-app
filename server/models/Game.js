const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  startTime: {
    type: Date,
    required: [true, "Date and time needed for the game. Format: 'YYYY-MM-DDTHH:mm:ss'"]
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    required: [true, "Game must have a home team"],
    ref: 'Team'
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    required: [true, "Game must have a home team"],
    ref: 'Team'
  },
  homeGoals: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  },
  awayGoals: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  },
  season: {
    type: Schema.Types.ObjectId,
    required: [true, "Game must belong to a season"],
    ref: 'Season'
  },
  gameType: {
    type: String,
    enum: {
      values: ['regular', 'semi-finals', 'championship'],
      message: '{VALUE} is not supported. Game type must be: regular, semi-finals, championship'
    },
    required: [true, "Game have a type: regular, semi-Finals, playoff"],
  },
  players: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
      },
      goals: {
        type: Number,
        default: 0,
        min: 0,
        required: true
      },
      played: {
        type: Boolean,
        default: false,
        required: true
      }
    }
  ],
}, {
  timestamps: true
});

const Game = model('Game', gameSchema);
module.exports = Game;
