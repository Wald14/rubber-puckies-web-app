const { Game } = require('../models');


async function getAllGames() {
  try {
    return await Game.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getLastPlayed(){
  try {
    return await Game.findOne().sort({startTime: -1}).where('completed').equals(true)
    .populate({path: "homeTeam awayTeam", select: "_id name"})
    .populate({path: "goalie players.player", select: "_id firstName lastName"});
  } catch (err) {
    throw new Error(err)
  }
}

async function getNextGame(){
  try {
    return await Game.findOne().sort({startTime: 1}).where('completed').equals(false)
    .populate({path: "homeTeam awayTeam", select: "_id name"})
    .populate({path: "goalie players.player", select: "_id firstName lastName"});
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllGamesByTeamId(teamId) {
  try {
    return await Game.find({
      $or: [
        {awayTeam: teamId},
        {homeTeam: teamId}
      ]
    }).populate({path: "homeTeam awayTeam", select: "_id name"});
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllGamesBySeasonId(seasonId) {
  try {
    return await Game.find({
      season: seasonId
    })
    .populate({path: "homeTeam awayTeam", select: "_id name"})
    .populate({path: "goalie players.player", select: "_id firstName lastName"});
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllGamesByPlayerId(playerId) {
  try {
    return await Game.find({
      completed: true,
      // "players.player": playerId
      $or: [
        {"players.player": playerId},
        {goalie: playerId}
      ]
    })
    .populate({path: "homeTeam awayTeam", select: "_id name"});
  } catch (err) {
    throw new Error(err);
  }
}


async function getGameById(id) {
  try {
    return await Game.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function createGame(data) {
  try {
    return await Game.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

async function updateGameById(id, data) {
  try {
    return await Game.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteGameById(id) {
  try {
    return await Game.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllGames,
  getLastPlayed,
  getNextGame,
  getAllGamesByPlayerId,
  getAllGamesByTeamId,
  getAllGamesBySeasonId,
  getGameById,
  createGame,
  updateGameById,
  deleteGameById
}
