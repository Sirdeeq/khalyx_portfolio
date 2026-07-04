const router = require('express').Router();
const ctrl = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { create } = require('../validations/contact.validation');

router.post('/', validate(create), ctrl.create);
router.get('/', protect, ctrl.list);
router.patch('/:id/read', protect, ctrl.markRead);

module.exports = router;
