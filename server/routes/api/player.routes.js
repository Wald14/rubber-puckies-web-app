const router = require('express').Router();

// Import any controllers needed here
const { getAllPlayers, getAllPlayersByTeamId, getPlayerById, createPlayer, updatePlayerById, deletePlayerById } = require('../../controllers/player.controller');


// Declare the routes that point to the controllers above
router.get("/", async (req, res) => {
  try {
    const payload = await getAllPlayers()
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})


router.get("/goalies", async (req, res) => {
  try {
    const payload = (await getAllPlayers()).filter(player => player.positions.includes("G"))
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})



router.get("/team/:teamId", async (req, res) => {
  try {
    const payload = await getAllPlayersByTeamId(req.params.teamId)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "Error", payload: err.message })
  }
})



router.get("/:id", async (req, res) => {
  try {
    const payload = await getPlayerById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})


router.post("/", async (req, res) => {
  try {
    const payload = await createPlayer(req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})


router.put("/:id", async (req, res) => {
  try {
    const payload = await updatePlayerById(req.params.id, req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deletePlayerById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
