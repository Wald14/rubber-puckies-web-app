const router = require('express').Router();

// Import any controllers needed here
const { getAllGames, getLastPlayed, getAllGamesByPlayerId, getAllGamesByTeamId, getAllGamesBySeasonId, getGameById, createGame, updateGameById, deleteGameById, } = require('../../controllers/game.controller');


// Declare the routes that point to the controllers above
router.get("/", async (req, res) => {
  try {
    const payload = await getAllGames()
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/lastPlayed", async (req, res) => {
  try {
    const payload = await getLastPlayed()
    res.status(200).json({result: "success", payload})
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/player/:playerId", async (req, res) => {
  try {
    const payload = await getAllGamesByPlayerId(req.params.playerId)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/team/:teamId", async (req, res) => {
  try {
    const payload = await getAllGamesByTeamId(req.params.teamId)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/season/:seasonId", async (req, res) => {
  try {
    const payload = await getAllGamesBySeasonId(req.params.seasonId)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await getGameById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})


router.post("/", async (req, res) => {
  try {
    const payload = await createGame(req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})


router.put("/:id", async (req, res) => {
  try {
    const payload = await updateGameById(req.params.id, req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteGameById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
