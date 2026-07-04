const router = require('express').Router();
const ctrl = require('../controllers/project.controller');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { create, update } = require('../validations/project.validation');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', protect, validate(create), ctrl.create);
router.put('/:id', protect, validate(update), ctrl.update);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
