const router = require('express').Router();
const ctrl = require('../controllers/service.controller');
const { protect } = require('../middleware/auth');

router.get('/', ctrl.list);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
