const { cloudinary } = require('../config/cloudinary');

exports.uploadImage = async (file) => {
  if (!file) return null;
  return {
    url: file.path,
    publicId: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
  };
};

exports.deleteImage = async (publicId) => {
  if (!publicId) return;
  return cloudinary.uploader.destroy(publicId);
};
