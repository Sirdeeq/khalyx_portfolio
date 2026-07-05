const router = require('express').Router();
const ctrl = require('../controllers/upload.controller');
const { protect } = require('../middleware/auth');
const { uploadImage, uploadVideo } = require('../middleware/upload');

router.post('/', protect, uploadImage.single('file'), ctrl.upload);
router.post('/multiple', protect, uploadImage.array('files', 10), ctrl.uploadMultiple);
router.post('/video', protect, uploadVideo.single('file'), ctrl.upload);

module.exports = router;
