// Import any controllers needed here
const { getAllTeams, getAllTeamsbyName, getTeamById, createTeam, updateTeamById, deleteTeamById } = require('../../controllers/team.controller');

const { getAllGames, getAllGamesByTeamId, getGameById, createGame, updateGameById, deleteGameById, } = require('../../controllers/game.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();



router.get("/:teamName", async (req, res) => {
  try {
    const teamSeasonInfo = await getAllTeamsbyName(req.params.teamName)

    const payload = await Promise.all(
      teamSeasonInfo.map(async (season) => {
        let wins = 0, loses = 0, ties = 0, goalsFor = 0, goalsAgainst = 0

        const seasonName = season.season.seasonType.charAt(0).toUpperCase() + season.season.seasonType.slice(1);
        const year = new Date(season.season.startDate).getFullYear();

        const seasonGameInfo = await getAllGamesByTeamId(season._id)

        seasonGameInfo.forEach((game) => {
          const completed = game.completed

          if (completed) {
            const teamName = req.params.teamName;
            const isHomeTeam = game.homeTeam.name === teamName;
            const isAwayTeam = game.awayTeam.name === teamName;
            const homeGoals = game.homeGoals;
            const awayGoals = game.awayGoals;

            goalsFor += isHomeTeam ? homeGoals : awayGoals;
            goalsAgainst += isHomeTeam ? awayGoals : homeGoals;

            if ((isHomeTeam && homeGoals > awayGoals) || (isAwayTeam && awayGoals > homeGoals)) {
              wins++;
            } else if ((isHomeTeam && homeGoals < awayGoals) || (isAwayTeam && awayGoals < homeGoals)) {
              loses++;
            } else if (awayGoals === homeGoals) {
              ties++;
            }
          }
        })

        return {
          season: `${seasonName} ${year}`,
          gamesPlayed: seasonGameInfo.length,
          record: `${wins} - ${loses} - ${ties}`,
          points: wins * 2 + ties * 1,
          point_percentage: ((wins * 2 + ties * 1) / (seasonGameInfo.length * 2)).toFixed(3),
          goals_for: goalsFor,
          goals_against: goalsAgainst,
          diff: goalsFor - goalsAgainst,
          season_finsh: "",
          playoff_finish: "",
          captain: season.captain.firstName + " " + season.captain.lastName,
          champions: "",
          rink: "",
        }

      })
    )

    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})


module.exports = router;
