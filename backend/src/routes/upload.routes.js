const router = require('express').Router();
const ctrl = require('../controllers/upload.controller');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', protect, upload.single('image'), ctrl.upload);
router.post('/multiple', protect, upload.array('images', 10), ctrl.uploadMultiple);

module.exports = router;
