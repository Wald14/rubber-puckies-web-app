const { Season } = require('../models');


async function getAllSeasons() {
  try {
    return await Season.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getCurrentSeason() {
  try {
    return await Season.findOne().sort({ startDate: -1 });
  } catch (err) {
    throw new Error(err)
  }
}

async function getSeasonById(id) {
  try {
    return await Season.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function createSeason(data) {
  try {
    return await Season.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

async function updateSeasonById(id, data) {
  try {
    return await Season.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteSeasonById(id) {
  try {
    return await Season.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllSeasons,
  getCurrentSeason,
  getSeasonById,
  createSeason,
  updateSeasonById,
  deleteSeasonById
}
