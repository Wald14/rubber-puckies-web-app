// Import any controllers needed here
const { getAllTeamsbyName, getChampion } = require('../../controllers/team.controller');
const { getAllGamesByTeamId } = require('../../controllers/game.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();



router.get("/bySeason/:teamName", async (req, res) => {
  try {
    const teamSeasonInfo = await getAllTeamsbyName(req.params.teamName)

    const splits = {
      homeAway: {
        home: {
          gp: 0,
          wins: 0,
          loses: 0,
          ties: 0,
          gf: 0,
          ga: 0
        },
        away: {
          gp: 0,
          wins: 0,
          loses: 0,
          ties: 0,
          gf: 0,
          ga: 0
        },
      },
      seasonType:{
        winter: {
          sp: 0,
          gp: 0,
          wins: 0,
          loses: 0,
          ties: 0,
          gf: 0,
          ga: 0
        },
        spring: {
          sp: 0,
          gp: 0,
          wins: 0,
          loses: 0,
          ties: 0,
          gf: 0,
          ga: 0
        },
        summer: {
          sp: 0,
          gp: 0,
          wins: 0,
          loses: 0,
          ties: 0,
          gf: 0,
          ga: 0
        },
        fall: {
          sp: 0,
          gp: 0,
          wins: 0,
          loses: 0,
          ties: 0,
          gf: 0,
          ga: 0
        },
      },
      startHour: [],
      opponent: [],
    }

    const payload = await Promise.all(
      teamSeasonInfo.map(async (season) => {
        const selectedSeasonId = season.season._id.toString()
        let seasonChamp = await getChampion(selectedSeasonId)

        splits.seasonType[(season.season.seasonType).toLowerCase()].sp++

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
          champion = seasonChamp ? seasonChamp.name : null,
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

          // REGULAR ///////////////////////////
          if (completed && gameType === "regular") {
            const teamName = req.params.teamName;
            const isHomeTeam = game.homeTeam.name === teamName;
            const isAwayTeam = game.awayTeam.name === teamName;
            const homeGoals = game.homeGoals;
            const awayGoals = game.awayGoals;
            const homeOraway = isHomeTeam ? 'home' : 'away'
            const opponent = isHomeTeam ? game.awayTeam.name : game.homeTeam.name
            const startHour = new Date(game.startTime).getHours()

            let oppIndex = splits.opponent.findIndex(obj => obj.teamName === opponent)
            if (oppIndex === -1){
              splits.opponent.push({
                teamName: opponent,
                sp: [],
                gp: 0,
                wins: 0,
                loses: 0,
                ties: 0,
                gf: 0,
                ga: 0
              })
            } 
            oppIndex = splits.opponent.findIndex(obj => obj.teamName === opponent)


            let hourIndex = splits.startHour.findIndex(obj => obj.startHour === startHour)
            if (hourIndex === -1){
              splits.startHour.push({
                startHour: startHour,
                gp: 0,
                wins: 0,
                loses: 0,
                ties: 0,
                gf: 0,
                ga: 0
              })
            } 
            hourIndex = splits.startHour.findIndex(obj => obj.startHour === startHour)

            gamesPlayed++

            splits.seasonType[season.season.seasonType].gp++
            splits.homeAway[homeOraway].gp++
            splits.startHour[hourIndex].gp++
            splits.opponent[oppIndex].gp++

            goalsFor += isHomeTeam ? homeGoals : awayGoals;
            goalsAgainst += isHomeTeam ? awayGoals : homeGoals;
            splits.seasonType[season.season.seasonType].gf += isHomeTeam ? homeGoals : awayGoals
            splits.seasonType[season.season.seasonType].ga += isHomeTeam ? awayGoals : homeGoals
            splits.homeAway[homeOraway].gf += isHomeTeam ? homeGoals : awayGoals
            splits.homeAway[homeOraway].ga += isHomeTeam ? awayGoals : homeGoals
            splits.startHour[hourIndex].gf += isHomeTeam ? homeGoals : awayGoals
            splits.startHour[hourIndex].ga += isHomeTeam ? awayGoals : homeGoals
            splits.opponent[oppIndex].gf += isHomeTeam ? homeGoals : awayGoals
            splits.opponent[oppIndex].ga += isHomeTeam ? awayGoals : homeGoals

            if ((isHomeTeam && homeGoals > awayGoals) || (isAwayTeam && awayGoals > homeGoals)) {
              wins++;
              splits.homeAway[homeOraway].wins++
              splits.seasonType[season.season.seasonType].wins++
              splits.startHour[hourIndex].wins++
              splits.opponent[oppIndex].wins++
            } else if ((isHomeTeam && homeGoals < awayGoals) || (isAwayTeam && awayGoals < homeGoals)) {
              loses++;
              splits.homeAway[homeOraway].loses++
              splits.seasonType[season.season.seasonType].loses++
              splits.startHour[hourIndex].loses++
              splits.opponent[oppIndex].loses++
            } else if (awayGoals === homeGoals) {
              ties++;
              splits.homeAway[homeOraway].ties++
              splits.seasonType[season.season.seasonType].ties++
              splits.startHour[hourIndex].ties++
              splits.opponent[oppIndex].ties++
            }

            
          }
          // PLAYOFF ///////////////////////////
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
                  season.playoffPlace > 2 ? (sol++, playoffLoses++) : (sow++, playoffWins++)
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
            wins: wins,
            loses: loses,
            ties: ties,
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
            wins: playoffWins,
            loses: playoffLoses,
            rounds: playoffRounds,
            semiRoundOpp: semiRoundOpp,
            sol: sol,
            sow: sow,
          }
        }

      })
    )
    res.status(200).json({ result: "success", payload, teamSeasonInfo, splits})
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})


module.exports = router;
