const router = require('express').Router();
const matchupRoutes = require('./matchup-routes');
const techRoutes = require('./tech-routes.js');

const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);

router.use('/matchup', matchupRoutes);
router.use('/tech', techRoutes);

module.exports = router;
