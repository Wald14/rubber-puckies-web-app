// Import any controllers needed here
const { getAllTeams, getTeamsbyNameAndSeasonId, getAllTeamsbyName, getTeamById, createTeam, updateTeamById, deleteTeamById } = require('../../controllers/team.controller');
const { getAllGames, getAllGamesByTeamId, getGameById, createGame, updateGameById, deleteGameById, getAllGamesByPlayerId, getAllGamesBySeasonId, } = require('../../controllers/game.controller');
const { getAllSeasons, getCurrentSeason, getSeasonById, createSeason, updateSeasonById, deleteSeasonById } = require('../../controllers/season.controller');
const { getAllPlayers, getAllPlayersByTeamId, getPlayerById, createPlayer, updatePlayerById, deletePlayerById } = require('../../controllers/player.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();



router.get("/:playerId", async ({ params: { playerId } }, res) => {
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


    const careerStats = {
      sp: [],
      gp: 0,
      g: 0,
      hat: 0,
      psp: 0,
      pgp: 0,
      pg: 0,
      phat: 0
    }


    const statsBySeason = await Promise.all(
      // Find all the teams the player played for
      player.teams.map(async (team) => {
        const seasonStats = {
          seasonInfo: {
            _id: team.season._id,
            startDate: team.season.startDate,
            seasonType: team.season.seasonType
          },
          totals: {
            gp: 0,
            g: 0,
            hat: 0,
            psp: 0,
            pgp: 0,
            pg: 0,
            phat: 0
          },
          games: []
        }

        // Finds all the games for the team
        const games = await getAllGamesByTeamId(team._id)

        // For each new season, add to sp array (length is used to calculate total number of seasons played)
        games.forEach(async (game) => {
          // For each new season, add to sp array (length is used to calculate total number of seasons played)
          if (careerStats.sp.indexOf(game.season._id.toString()) === -1) {
            careerStats.sp.push(game.season._id.toString())
          }

          // Find player's indivudal stats for each game
          const playerGameStats = game.players.find(player => player.player._id.toString() === playerId)

          // Update Player Stats if it's a regular season game
          if (playerGameStats.played && game.gameType === "regular") {
            // Update Career Totals
            careerStats.gp++
            careerStats.g += playerGameStats.goals
            playerGameStats.goals > 2 ? careerStats.hat++ : careerStats.hat
            // Update Season Totals
            seasonStats.totals.gp++
            seasonStats.totals.g += playerGameStats.goals
            playerGameStats.goals > 2 ? seasonStats.totals.hat++ : seasonStats.totals.hat

            // Update Player Stats if it's a playoff game
          } else if (playerGameStats.played && game.gameType !== "regular") {
            // Update Career Totals
            careerStats.pgp++
            careerStats.pg += playerGameStats.goals
            playerGameStats.goals > 2 ? careerStats.phat++ : careerStats.phat
            // Update Season Totals
            seasonStats.totals.pgp++
            seasonStats.totals.pg += playerGameStats.goals
            playerGameStats.goals > 2 ? seasonStats.totals.phat++ : playerGameStats.goals
          }

          seasonStats.games.push({
            _id: game._id.toString(),
            startTime: game.startTime,
            gameType: game.gameType,
            opponent: game.homeTeam.name === "Rubber Puckies" ? game.awayTeam.name : game.homeTeam.name,
            playerGoals: playerGameStats.goals,
            playerHat: playerGameStats.goals > 2 ? 1 : 0,
            played: playerGameStats.played
          })
        })

        return { seasonStats }
      })
    )

    res.status(200).json({ result: "success", playerInfo, careerStats, statsBySeason })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

module.exports = router;
