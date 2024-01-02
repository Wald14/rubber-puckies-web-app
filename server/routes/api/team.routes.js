const router = require('express').Router();

// Import any controllers needed here
const { getAllTeams, getTeamsbyNameAndSeasonId, getAllTeamsbyName, getTeamsbySeasonId, getMostRecentTeam, getTeamById, createTeam, updateTeamById, deleteTeamById } = require('../../controllers/team.controller');

// Declare the routes that point to the controllers above
router.get("/", async (req, res) => {
  try {
    const payload = await getAllTeams()
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/name/:teamName/season/:seasonId", async (req, res) => {
  try {
    const payload = await getTeamsbyNameAndSeasonId(req.params.teamName, req.params.seasonId)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/season/:seasonId", async (req, res) => {
  try {
    const payload = await getTeamsbySeasonId(req.params.seasonId)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/name/:teamName", async (req, res) => {
  try {
    const payload = await getAllTeamsbyName(req.params.teamName)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/mostrecent", async (req, res) => {
  try {
    const payload = await getMostRecentTeam()
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await getTeamById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})


router.post("/", async (req, res) => {
  try {
    const payload = await createTeam(req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})


router.put("/:id", async (req, res) => {
  try {
    const payload = await updateTeamById(req.params.id, req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteTeamById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
