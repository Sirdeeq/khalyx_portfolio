const router = require('express').Router();
const ctrl = require('../controllers/hero.controller');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { update } = require('../validations/hero.validation');

router.get('/', ctrl.get);
router.put('/', protect, validate(update), ctrl.update);

module.exports = router;
