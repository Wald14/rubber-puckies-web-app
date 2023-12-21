const router = require('express').Router();

const sampleRoutes = require('./sample.routes');
const userRoutes = require('./user.routes');
const seasonRoutes = require('./season.routes');

router.use('/sample', sampleRoutes);
router.use('/user', userRoutes);
router.use('/season', seasonRoutes);

module.exports = router;
