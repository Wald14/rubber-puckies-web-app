// Import any controllers needed here
const { getAllTeams, getTeamsbyNameAndSeasonId, getAllTeamsbyName, getTeamById, createTeam, updateTeamById, deleteTeamById } = require('../../controllers/team.controller');
const { getAllGames, getAllGamesByTeamId, getGameById, createGame, updateGameById, deleteGameById, getAllGamesByPlayerId, } = require('../../controllers/game.controller');
const { getAllSeasons, getCurrentSeason, getSeasonById, createSeason, updateSeasonById, deleteSeasonById } = require('../../controllers/season.controller');
const { getAllPlayers, getAllPlayersByTeamId, getPlayerById, createPlayer, updatePlayerById, deletePlayerById } = require('../../controllers/player.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();



router.get("/:playerId", async ({params: {playerId}}, res) => {
  try {
   const player = await getPlayerById(playerId)
   const playerInfo = {
    _id: player._id,
    firstName: player.firstName,
    lastName: player.lastName,
    handedness: player.handedness,
    jerseyNumber: player.jerseyNumber,
    positions: player.positions,
   }


   const careerTotals = {
     totalGP: 0,
     totalGoals: 0,
     totalHats: 0 ,
     totalPlayoffGP: 0,
     totalPlayoffGoals: 0,
     totalPlayoffHats: 0 
  }

   const statsBySeason = await Promise.all(
    player.teams.map(async(team) => {
      let seasonGP = 0,
          seasonGoals = 0,
          seasonHat = 0,
          playoffGP = 0,
          playoffGoals = 0,
          playoffHat = 0

      let teamGP = 0,
          teamGoals = 0,
          teamPlayoffGP = 0,
          teamPlayoffGoals = 0

      return {
        seasonInfo: {
          _id: team.season._id,
          seasonType: team.season.seasonType,
          startDate: team.season.startDate,
          captain: team.season.captain
        },
        playerStats: {
          seasonGP: seasonGP,
          seasonGoals: seasonGoals,
          seasonHat: seasonHat,
          playoffGP: playoffGP,
          playoffGoals: playoffGoals,
          playoffHat: playoffHat
        }
      }
    })
   )

    res.status(200).json({ result: "success", playerInfo, statsBySeason })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

module.exports = router;
