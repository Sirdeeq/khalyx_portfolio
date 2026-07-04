const router = require('express').Router();
const ctrl = require('../controllers/media.controller');
const { protect } = require('../middleware/auth');

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

module.exports = router;
