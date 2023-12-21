const router = require('express').Router();

const sampleRoutes = require('./sample.routes');
const userRoutes = require('./user.routes');
const seasonRoutes = require('./season.routes');
const teamRoutes = require('./team.routes');
const gameRoutes = require('./game.routes');
const playerRoutes = require('./player.routes');

router.use('/sample', sampleRoutes);
router.use('/user', userRoutes);
router.use('/season', seasonRoutes);
router.use('/team', teamRoutes);
router.use('/game', gameRoutes);
router.use('/player', playerRoutes);

module.exports = router;
