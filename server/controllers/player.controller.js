const { Player } = require('../models');


async function getAllPlayers() {
  try {
    return await Player.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllPlayersByTeamId(teamId) {
  try {
    return await Player.find({ teams: teamId})
  } catch (err) {
    throw new Error(err)
  }
}


async function getPlayerById(id) {
  try {
    return await Player.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function createPlayer(data) {
  try {
    return await Player.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

async function updatePlayerById(id, data) {
  try {
    return await Player.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deletePlayerById(id) {
  try {
    return await Player.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllPlayers,
  getAllPlayersByTeamId,
  getPlayerById,
  createPlayer,
  updatePlayerById,
  deletePlayerById
}
