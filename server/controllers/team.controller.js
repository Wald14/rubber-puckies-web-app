const { Team, Season } = require('../models');


async function getAllTeams() {
  try {
    return await Team.find().populate({ path: "season", select: "startDate seasonType" });
  } catch (err) {
    throw new Error(err)
  }
}

async function getTeamsbyNameAndSeasonId(teamName, seasonId) {
  try {
    return await Team.findOne({ name: teamName, season: seasonId }).populate({ path: "season", select: "startDate seasonType playoffRounds rink" }).populate({ path: "captain", select: "firstName lastName -_id" });
  } catch (err) {
    throw new Error(err)
  }
}

async function getTeamsbySeasonId(seasonId) {
  try {
    return await Team.find({ season: seasonId }).populate({ path: "season", select: "startDate seasonType playoffRounds rink" }).populate({ path: "captain", select: "firstName lastName -_id" });
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllTeamsbyName(teamName) {
  try {
    return await Team.find({ name: teamName }).populate({ path: "season", select: "startDate seasonType playoffRounds rink" }).populate({ path: "captain", select: "firstName lastName -_id" });
  } catch (err) {
    throw new Error(err)
  }
}


async function getMostRecentTeam() {
  try {
    return await Team.findOne().sort({ createdAt: -1 });
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
  getTeamsbyNameAndSeasonId,
  getTeamsbySeasonId,
  getAllTeamsbyName,
  getMostRecentTeam,
  getTeamById,
  createTeam,
  updateTeamById,
  deleteTeamById
}
