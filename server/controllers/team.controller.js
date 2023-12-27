const { Team } = require('../models');


async function getAllTeams() {
  try {
    return await Team.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllTeamsbyName(teamName) {
  try {
    return await Team.find({ name: teamName }).populate({path: "season", select: "startDate seasonType"}).populate({path: "captain", select: "firstName lastName -_id"});
  } catch (err) {
    throw new Error(err)
  }
}

async function getTeamById(id) {
  try {
    return await Team.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function createTeam(data) {
  try {
    return await Team.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

async function updateTeamById(id, data) {
  try {
    return await Team.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteTeamById(id) {
  try {
    return await Team.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllTeams,
  getAllTeamsbyName,
  getTeamById,
  createTeam,
  updateTeamById,
  deleteTeamById
}
