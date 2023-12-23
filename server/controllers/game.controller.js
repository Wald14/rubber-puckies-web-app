const { Game } = require('../models');


async function getAllGames() {
  try {
    return await Game.find();
  } catch (err) {
    throw new Error(err)
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
  getGameById,
  createGame,
  updateGameById,
  deleteGameById
}