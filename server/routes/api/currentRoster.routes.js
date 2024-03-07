// Import any controllers needed here
const { getAllTeams, getTeamsbyNameAndSeasonId, getAllTeamsbyName, getTeamById, createTeam, updateTeamById, deleteTeamById } = require('../../controllers/team.controller');
const { getAllGames, getAllGamesByTeamId, getGameById, createGame, updateGameById, deleteGameById, getAllGamesByPlayerId, } = require('../../controllers/game.controller');
const { getAllSeasons, getCurrentSeason, getSeasonById, createSeason, updateSeasonById, deleteSeasonById } = require('../../controllers/season.controller');
const { getAllPlayers, getAllPlayersByTeamId, getPlayerById, createPlayer, updatePlayerById, deletePlayerById } = require('../../controllers/player.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();



router.get("/:teamName", async ({ params: { teamName } }, res) => {
  try {
    // Grab most recent season info
    const curSeason = await getCurrentSeason()
    const seasonType = curSeason.seasonType.charAt(0).toUpperCase() + curSeason.seasonType.slice(1);
    const year = new Date(curSeason.startDate).getFullYear();

    // Season Info for export
    const seasonInfo = {
      _id: curSeason._id,
      seasonName: `${seasonType} ${year}`,
      startDate: curSeason.startDate
    }

    // Grab user entered team from most recent season
    const curTeam = await getTeamsbyNameAndSeasonId(teamName, curSeason._id)

    // Team Info for export
    const teamInfo = {
      _id: curTeam._id,
      name: curTeam.name,
      captain: curTeam.captain
    }

    // Grab players from that team
    const curPlayers = await getAllPlayersByTeamId(curTeam._id)

    // players.map(async (player) => { return player info })
    // const playerInfo = await getAllGamesByPlayerId("658b4fab700cb48ab31b2eaa")

    const playerInfo = await Promise.all(
      curPlayers.map(async (player) => {
        const playerId = player._id.toString()

        let gp = 0,
          goals = 0,
          hat = 0,
          tg = 0,
          playoffgp = 0,
          playoffgoals = 0,
          playoffhat = 0
        let playedSeasonArr = []

        let goaliegp = 0,
          wins = 0,
          losses = 0,
          ties = 0,
          goalsagainst = 0,
          shutouts = 0
        let goaliePlayedSeasonArr = []

        let currentSeasonStats = {
          skater: {
            gp: 0,
            goals: 0,
            hat: 0
          },
          goalie: {
            gp: 0,
            wins: 0,
            losses: 0,
            ties: 0,
            goalsagainst: 0,
            shutouts: 0
          }
        }

        const handedness = player.handedness === "left" ? "L" : player.handedness === "right" ? "R" : null

        const positions = player.positions.join(", ")

        const gamesArr = await getAllGamesByPlayerId(player._id)
        gamesArr.forEach((game) => {

          if (game.gameType === "regular") {
            const gamesSeaon = game.season.toString()
            if (playedSeasonArr.indexOf(gamesSeaon) === -1) {
              playedSeasonArr.push(gamesSeaon)
            }
            game.players.forEach((playerInGame) => {
              const playerInGameId = playerInGame.player.toString();
              if (playerInGameId === playerId && playerInGame.played === true) {
                gp++;
                goals += playerInGame.goals;
                if (playerInGame.goals > 2) {
                  hat++;
                }

                if (seasonInfo._id.toString() === game.season.toString()) {
                  currentSeasonStats.skater.gp++
                  currentSeasonStats.skater.goals += playerInGame.goals
                  if (playerInGame.goals > 2) { currentSeasonStats.skater.hat++ }
                }
              }
            });
          } else if (game.gameType === "semifinal" || game.gameType === "championship") {
            game.players.forEach((playerInGame) => {
              const playerInGameId = playerInGame.player.toString();
              if (playerInGameId === playerId && playerInGame.played === true) {
                playoffgp++;
                playoffgoals += playerInGame.goals;
                if (playerInGame.goals > 2) {
                  playoffhat++;
                }
              }
            })
          }


          const goalie = game.goalie ? game.goalie.toString() : null
          if (goalie === player._id.toString()) {
            // Track Regular Season Stats
            if (game.gameType === "regular") {

              // Track how many different seasons the goalie played at least one game in
              const goalieGamesSeaon = game.season.toString()
              if (goaliePlayedSeasonArr.indexOf(goalieGamesSeaon) === -1) {
                goaliePlayedSeasonArr.push(goalieGamesSeaon)
              }

              // Track number of games played as goalie
              goaliegp++
              if (seasonInfo._id.toString() === game.season.toString()) {
                currentSeasonStats.goalie.gp++
              }

              // Track goalie regular season record AND goals against
              if (game.homeGoals === game.awayGoals) {
                ties++
                goalsagainst += game.homeGoals
                // current season check
                if (seasonInfo._id.toString() === game.season.toString()) {
                  currentSeasonStats.goalie.ties++
                  currentSeasonStats.goalie.goalsagainst += game.homeGoals
                }
              }

              else if (game.homeTeam.name === teamName && game.homeGoals > game.awayGoals) {
                wins++
                goalsagainst += game.awayGoals
                if (game.awayGoals === 0) {
                  shutouts++
                }
                // current season check
                if (seasonInfo._id.toString() === game.season.toString()) {
                  currentSeasonStats.goalie.wins++
                  currentSeasonStats.goalie.goalsagainst += game.awayGoals
                  if (game.awayGoals === 0) { currentSeasonStats.goalie.shutouts++ }
                }

              } else if (game.awayTeam.name === teamName && game.awayGoals > game.homeGoals) {
                wins++
                goalsagainst += game.homeGoals
                if (game.homeGoals === 0) {
                  shutouts++
                }
                // current season check
                if (seasonInfo._id.toString() === game.season.toString()) {
                  currentSeasonStats.goalie.wins++
                  currentSeasonStats.goalie.goalsagainst += game.homeGoals
                  if (game.homeGoals === 0) { currentSeasonStats.goalie.shutouts++ }
                }


              } else if (game.homeTeam.name === teamName && game.homeGoals < game.awayGoals) {
                losses++
                goalsagainst += game.awayGoals
                // current season check
                if (seasonInfo._id.toString() === game.season.toString()) {
                  currentSeasonStats.goalie.losses++
                  currentSeasonStats.goalie.goalsagainst += game.awayGoals
                }

              } else if (game.awayTeam.name === teamName && game.homeGoals > game.awayGoals) {
                losses++
                goalsagainst += game.homeGoals
                if (seasonInfo._id.toString() === game.season.toString()) {
                  currentSeasonStats.goalie.losses++
                  currentSeasonStats.goalie.goalsagainst += game.homeGoals
                }


              }
            }
          }

        });

        const goalsPerGamePlayed = !goals ? (0.00).toFixed(2) : (goals / gp).toFixed(2)
        const playoffgoalsPerGamePlayed = !playoffgoals ? (0.00).toFixed(2) : (playoffgoals / playoffgp).toFixed(2)

        const goalsagainstavg = !goalsagainst && !goaliegp ? (0.00).toFixed(2) : (goalsagainst / goaliegp).toFixed(2)
        const winpercent = !wins && !goaliegp ? (0.00).toFixed(3) : (wins / goaliegp).toFixed(3)
        const shutoutspercent = !shutouts && !goaliegp ? (0.00).toFixed(3) : (shutouts / goaliegp).toFixed(3)

        return {
          _id: player._id,
          firstName: player.firstName,
          lastName: player.lastName,
          jerseyNumber: player.jerseyNumber,
          pos: positions,
          handedness: handedness,
          sp: playedSeasonArr.length,
          gp: gp,
          goals: goals,
          goalsPerGamePlayed: goalsPerGamePlayed,
          hat: hat,
          tg: tg,
          playoffgp: playoffgp,
          playoffgoals: playoffgoals,
          playoffgoalsPerGamePlayed: playoffgoalsPerGamePlayed,
          playoffhat: playoffhat,
          // currentSeason: currentSeasonStats,
          currentSeasonGP: currentSeasonStats.skater.gp,
          currentSeasonGoals: currentSeasonStats.skater.goals,
          currentSeasonHATs: currentSeasonStats.skater.hat,
          currentSeasonGoalieGP: currentSeasonStats.goalie.gp,
          currentSeasonGoalieWins: currentSeasonStats.goalie.wins,
          currentSeasonGoalieLoses: currentSeasonStats.goalie.losses,
          currentSeasonGoalieTies: currentSeasonStats.goalie.ties,
          currentSeasonGoalieGA: currentSeasonStats.goalie.goalsagainst,
          currentSeasonGoalieShutouts: currentSeasonStats.goalie.shutouts,
          goaliestats: {
            sp: goaliePlayedSeasonArr.length,
            gp: goaliegp,
            wins: wins,
            losses: losses,
            ties: ties,
            ga: goalsagainst,
            gaa: goalsagainstavg,
            shutouts: shutouts,
            winpercent: winpercent,
            shutoutspercent: shutoutspercent
          }
        }
      })
    )
    res.status(200).json({ result: "success", seasonInfo, teamInfo, playerInfo })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

module.exports = router;
