const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { login, changePassword } = require('../validations/auth.validation');

router.post('/login', validate(login), ctrl.login);
router.get('/me', protect, ctrl.getMe);
router.put('/change-password', protect, validate(changePassword), ctrl.changePassword);

module.exports = router;
