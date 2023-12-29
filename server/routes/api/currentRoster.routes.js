// Import any controllers needed here
const { getAllTeams, getTeamsbyNameAndSeasonId, getAllTeamsbyName, getTeamById, createTeam, updateTeamById, deleteTeamById } = require('../../controllers/team.controller');
const { getAllGames, getAllGamesByTeamId, getGameById, createGame, updateGameById, deleteGameById, getAllGamesByPlayerId, } = require('../../controllers/game.controller');
const { getAllSeasons, getCurrentSeason, getSeasonById, createSeason, updateSeasonById, deleteSeasonById } = require('../../controllers/season.controller');
const { getAllPlayers, getAllPlayersByTeamId, getPlayerById, createPlayer, updatePlayerById, deletePlayerById } = require('../../controllers/player.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();



router.get("/:teamName", async (req, res) => {
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
    const curTeam = await getTeamsbyNameAndSeasonId(req.params.teamName, curSeason._id)

    // Team Info for export
    const teamnInfo = {
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
          tg = 0

        let playedSeasonArr = []

        const handedness = player.handedness === "left" ? "L" : player.handedness === "right" ? "R" : null

        const positions = player.positions.join(" / ")

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

              }
            });
          }
        });

        const goalsPerGamePlayed = !goals ? (0.00).toFixed(2) : (goals/gp).toFixed(2)

        return {
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
          tg: tg
        }
      })
    )


    res.status(200).json({ result: "success", seasonInfo, teamnInfo, playerInfo })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

module.exports = router;
