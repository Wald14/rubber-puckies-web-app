// Import any controllers needed here
const { getAllTeams, getAllTeamsbyName, getTeamById, createTeam, updateTeamById, deleteTeamById } = require('../../controllers/team.controller');
const { getAllGames, getAllGamesByTeamId, getGameById, createGame, updateGameById, deleteGameById, } = require('../../controllers/game.controller');
const { getAllSeasons, getCurrentSeason, getSeasonById, createSeason, updateSeasonById, deleteSeasonById } = require('../../controllers/season.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();



router.get("/:teamName", async (req, res) => {
  try {
    const curSeason = await getCurrentSeason()
    const seasonType = curSeason.seasonType.charAt(0).toUpperCase() + curSeason.seasonType.slice(1);
    const year = new Date(curSeason.startDate).getFullYear();
    const seasonName = `${seasonType} ${year}`

    // const curTeams = getAllTeamsBySeasonId
    // const players = getAllPlayersByTeamId

    // players.map(async (player) => { return player info })
    // 

    res.status(200).json({ result: "success", curSeason })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

module.exports = router;
