const router = require('express').Router();
const ctrl = require('../controllers/about.controller');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { update } = require('../validations/about.validation');

router.get('/', ctrl.get);
router.put('/', protect, validate(update), ctrl.update);

module.exports = router;
