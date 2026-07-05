const { cloudinary } = require('../config/cloudinary');

exports.uploadFile = async (file) => {
  if (!file) return null;
  const isVideo = file.mimetype.startsWith('video/');
  let thumbnail = '';
  if (isVideo) {
    try {
      thumbnail = cloudinary.url(file.filename, {
        resource_type: 'video',
        format: 'jpg',
        transformation: [
          { width: 480, height: 360, crop: 'fill', quality: 'auto', start_offset: 1 }
        ],
      });
    } catch { /* thumbnail not critical */ }
  }
  return {
    url: file.path,
    publicId: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
    type: isVideo ? 'video' : 'image',
    thumbnail,
  };
};

exports.deleteFile = async (publicId, resourceType = 'image') => {
  if (!publicId) return;
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};
