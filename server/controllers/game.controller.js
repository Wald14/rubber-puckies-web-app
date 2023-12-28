const { Game } = require('../models');


async function getAllGames() {
  try {
    return await Game.find();
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
    }).populate({path: "homeTeam awayTeam", select: "-_id name"}).select("-_id completed homeTeam awayTeam homeGoals awayGoals season gameType");
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllGamesByPlayerId(playerId) {
  try {
    return await Game.find({
      completed: true,
      "players.player": playerId
    });
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
  getAllGamesByPlayerId,
  getAllGamesByTeamId,
  getGameById,
  createGame,
  updateGameById,
  deleteGameById
}
