// Import any controllers needed here
const { getAllTeamsbyName, getChampion } = require('../../controllers/team.controller');
const { getAllGamesByTeamId } = require('../../controllers/game.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();



router.get("/:teamName", async (req, res) => {
  try {
    const teamSeasonInfo = await getAllTeamsbyName(req.params.teamName)

    const payload = await Promise.all(
      teamSeasonInfo.map(async (season) => { 
        const selectedSeasonId = season.season._id.toString()
        let seasonChamp = await getChampion(selectedSeasonId)

        let wins = 0,
          loses = 0,
          ties = 0,
          goalsFor = 0,
          goalsAgainst = 0,
          gamesPlayed = 0,
          seasonFinish = season.seasonPlace ? season.seasonPlace : null

        let playoffWins = 0,
          playoffLoses = 0,
          sow = 0,
          sol = 0,
          playoffGamesPlayed = 0,
          playoffGoalsFor = 0,
          playoffGoalsAgainst = 0,
          champion = seasonChamp.name ? seasonChamp.name : null,
          championshipOpp = null,
          championshipScore = null,
          semiRoundOpp = null,
          playoffFinish = season.playoffPlace ? season.playoffPlace : null


        const seasonName = season.season.seasonType.charAt(0).toUpperCase() + season.season.seasonType.slice(1);
        const year = new Date(season.season.startDate).getFullYear();

        const playoffRounds = season.season.playoffRounds
        const rink = season.season.rink

        const seasonGameInfo = await getAllGamesByTeamId(season._id)

        seasonGameInfo.forEach((game) => {
          const completed = game.completed
          const gameType = game.gameType

          if (completed && gameType === "regular") {
            gamesPlayed++

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

          // PLAYOFF
          if (completed && (gameType === "semifinal" || gameType === "championship")) {
            playoffGamesPlayed++

            const teamName = req.params.teamName;
            const isHomeTeam = game.homeTeam.name === teamName;
            const isAwayTeam = game.awayTeam.name === teamName;
            const homeGoals = game.homeGoals;
            const awayGoals = game.awayGoals;

            playoffGoalsFor += isHomeTeam ? homeGoals : awayGoals;
            playoffGoalsAgainst += isHomeTeam ? awayGoals : homeGoals;

            if (gameType === "championship") {
              championshipOpp = isHomeTeam ? game.awayTeam.name : game.homeTeam.name
              championshipScore = isHomeTeam ? `${homeGoals} - ${awayGoals}` : `${awayGoals} - ${homeGoals}`
            }

            if (gameType === "semifinal") {
              semiRoundOpp = isHomeTeam ? game.awayTeam.name : game.homeTeam.name
            }

            // if ((isHomeTeam && homeGoals > awayGoals) || (isAwayTeam && awayGoals > homeGoals)) {
            //   playoffWins++;
            // } else if ((isHomeTeam && homeGoals < awayGoals) || (isAwayTeam && awayGoals < homeGoals)) {
            //   playoffLoses++;
            // }


            switch (game.endedIn) {
              case "regulation" || "overtime":
                if ((isHomeTeam && homeGoals > awayGoals) || (isAwayTeam && awayGoals > homeGoals)) {
                  playoffWins++;
                } else {
                  playoffLoses++;
                }
                break;

              case "shootout":
                if (gameType === "semifinal") {
                  season.playoffPlace > 2 ? (sol++, playoffLoses++)  : (sow++, playoffWins++)
                }
                if (gameType === "championship") {
                  season.playoffPlace === 2 ? (sol++, playoffLoses++) : (sow++, playoffWins++)
                }
            }


          }
        })

        return {
          captain: season.captain.firstName + " " + season.captain.lastName,
          rink: rink,
          season: `${seasonName} ${year}`,

          regular: {
            diff: goalsFor - goalsAgainst,
            diff_per_game: ((goalsFor - goalsAgainst) / gamesPlayed).toFixed(1),
            finish: seasonFinish,
            gamesPlayed: gamesPlayed,
            goals_against: goalsAgainst,
            goals_for: goalsFor,
            goals_against_per_game: (goalsAgainst / gamesPlayed).toFixed(1),
            goals_per_game: (goalsFor / gamesPlayed).toFixed(1),
            record: `${wins} - ${loses} - ${ties}`,
            points: wins * 2 + ties * 1,
            point_percentage: ((wins * 2 + ties * 1) / (gamesPlayed * 2)).toFixed(3),
          },

          playoff: {
            champion: champion,
            championshipOpp: championshipOpp,
            championshipScore: championshipScore,
            finish: playoffFinish,
            ga: playoffGoalsAgainst,
            gamesPlayed: playoffGamesPlayed,
            gf: playoffGoalsFor,
            record: `${playoffWins} - ${playoffLoses}`,
            rounds: playoffRounds,
            semiRoundOpp: semiRoundOpp,
            sol: sol,
            sow: sow,
          }
        }

      })
    )
    res.status(200).json({ result: "success", payload, teamSeasonInfo })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})


module.exports = router;
