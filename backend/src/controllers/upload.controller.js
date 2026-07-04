const { success, error } = require('../utils/apiResponse');
const { uploadImage } = require('../services/upload.service');

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) return error(res, 'No file uploaded', 400);
    const result = await uploadImage(req.file);
    return success(res, result, 'File uploaded successfully');
  } catch (err) { next(err); }
};

exports.uploadMultiple = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) return error(res, 'No files uploaded', 400);
    const results = await Promise.all(req.files.map(uploadImage));
    return success(res, results, 'Files uploaded successfully');
  } catch (err) { next(err); }
};
