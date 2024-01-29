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
      //skater regular season
      sp: [],
      gp: 0,
      g: 0,
      hat: 0,

      //skater playoff
      psp: 0,
      pgp: 0,
      pg: 0,
      phat: 0,

      // goalie regular season
      goalie: {
        gp: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        ga: 0,
        shutouts: 0,

        // goalie playoff season
        pgp: 0,
        pwins: 0,
        plosses: 0,
        pties: 0,
        pga: 0,
        pshutouts: 0,
        sow: 0,
        sol: 0,
      }
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
            // Skater Regular
            gp: 0,
            g: 0,
            hat: 0,
            // Skater Playoff
            psp: 0,
            pgp: 0,
            pg: 0,
            phat: 0,
            // Goalie Regular
            goaliegp: 0,
            wins: 0,
            losses: 0,
            ties: 0,
            ga: 0,
            shutouts: 0,
            // Goalie Playoff
            pgoaliegp: 0,
            pwins: 0,
            plosses: 0,
            pties: 0,
            pga: 0,
            pshutouts: 0,
            sow: 0,
            sol: 0,
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


          
          // Find goalie
          const goalie = game.goalie ? game.goalie.toString() : null

          // Calculate Goalie Stats
          if (playerId === goalie) {

            const isHome = game.homeTeam.name === "Rubber Puckies" ? true : false

            let opponentGoals = isHome ? game.awayGoals : game.homeGoals

            // Regular Stats
            if (game.gameType === "regular") {
              careerStats.goalie.gp++
              careerStats.goalie.ga += opponentGoals

              // Goalie Record Stats
              if (game.homeGoals === game.awayGoals) {
                careerStats.goalie.ties++
                careerStats.goalie.shutouts += opponentGoals === 0 ? 1 : 0
              } else if (isHome && game.homeGoals > game.awayGoals || !isHome && game.awayGoals > game.homeGoals) {
                careerStats.goalie.wins++
                careerStats.goalie.shutouts += opponentGoals === 0 ? 1 : 0
              } else if (isHome && game.homeGoals < game.awayGoals || !isHome && game.homeGoals > game.awayGoals) {
                careerStats.goalie.losses++
              }

              // Playoff Stats
            } 
            // else {
            //   careerStats.goalie.pgp++
            //   careerStats.goalie.pga += opponentGoals

            //   switch (game.endedIn) {
            //     case "regulation" || "overtime":
            //       if ((isHomeTeam && game.homeGoals > game.awayGoals) || (!isHomeTeam && game.awayGoals > game.homeGoals)) {
            //         careerStats.goalie.pwins++;
            //         careerStats.goalie.pshutouts += opponentGoals === 0 ? 1 : 0
            //       } else {
            //         careerStats.goalie.plosses++;
            //       }
            //       break;

            //     case "shootout":
            //       if (game.gameType === "semifinal") {
            //         team.playoffPlace > 2 ? (
            //           careerStats.goalie.plosses++, 
            //           careerStats.goalie.sol++ 
            //           ) : (
            //           careerStats.goalie.pwins++, 
            //           careerStats.goalie.sow++,
            //           careerStats.goalie.pshutouts += opponentGoals === 0 ? 1 : 0
            //           )
            //       }
            //       if (game.gameType === "championship") {
            //         team.playoffPlace === 2 ? (careerStats.goalie.plosses++, careerStats.goalie.sol++) : (careerStats.goalie.pwins++, careerStats.goalie.sow++)
            //       }
            //   }
            // }
          }



          seasonStats.games.push({
            _id: game._id.toString(),
            startTime: game.startTime,
            gameType: game.gameType,
            homeOrAway: game.homeTeam.name === "Rubber Puckies" ? "home" : "away",
            opponent: game.homeTeam.name === "Rubber Puckies" ? game.awayTeam.name : game.homeTeam.name,
            homeGoals: game.homeGoals,
            awayGoals: game.awayGoals,
            playerGoals: playerGameStats.goals,
            playerHat: playerGameStats.goals > 2 ? 1 : 0,
            played: playerGameStats.played,
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
