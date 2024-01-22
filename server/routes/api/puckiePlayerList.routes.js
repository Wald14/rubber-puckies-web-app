// Import any controllers needed here
const {getAllTeamsbyName} = require('../../controllers/team.controller');
const {getAllPlayers} = require('../../controllers/player.controller');

// Declare the routes that point to the controllers above
const router = require('express').Router();

router.get("/:teamName", async ({params: {teamName}}, res) => {
  try {
    const teamPayload = await getAllTeamsbyName(teamName)
    const teamIds = teamPayload.map(team => team._id.toString())

    const playerPayload = await getAllPlayers()

    const puckiePlayerList = []

    playerPayload.forEach ((player) => {
      const playerTeamList = []
      player.teams.map(team => playerTeamList.push(team._id.toString()))
      const playerPuckieTeams = playerTeamList.filter(team => teamIds.includes(team))
      if (playerPuckieTeams.length > 0) {
        puckiePlayerList.push({
          _id: player._id,
          firstName: player.firstName,
          lastName: player.lastName,
          jerseyNumber: player.jerseyNumber,
          handedness: player.handedness,
          positions: player.positions,
          teams: player.playerTeamList
        })
      }
    })

    puckiePlayerList.sort(function (a, b) {
      let x = a.firstName.toLowerCase();
      let y = b.firstName.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    })

    res.status(200).json({ result: "Success", puckiePlayerList})
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

module.exports = router;