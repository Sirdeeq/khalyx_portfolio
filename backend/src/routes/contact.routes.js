const router = require('express').Router();
const ctrl = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { create, reply } = require('../validations/contact.validation');

router.post('/', validate(create), ctrl.create);
router.get('/', protect, ctrl.list);
router.patch('/:id/read', protect, ctrl.markRead);
router.post('/:id/reply', protect, validate(reply), ctrl.reply);

module.exports = router;
