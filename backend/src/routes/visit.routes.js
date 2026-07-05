const router = require('express').Router();
const ctrl = require('../controllers/visit.controller');
const { protect } = require('../middleware/auth');

router.post('/track', ctrl.track);
router.get('/stats', protect, ctrl.stats);

module.exports = router;
