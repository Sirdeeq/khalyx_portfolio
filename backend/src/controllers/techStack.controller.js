const TechStack = require('../models/TechStack');
const { success, error } = require('../utils/apiResponse');

exports.list = async (req, res, next) => {
  try {
    const data = await TechStack.find({ isActive: true }).sort('order').lean();
    return success(res, data);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await TechStack.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return error(res, 'Tech stack category not found', 404);
    return success(res, item, 'Tech stack category updated');
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await TechStack.create(req.body);
    return success(res, item, 'Tech stack category created', 201);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await TechStack.findByIdAndDelete(req.params.id);
    if (!item) return error(res, 'Tech stack category not found', 404);
    return success(res, null, 'Tech stack category deleted');
  } catch (err) { next(err); }
};
