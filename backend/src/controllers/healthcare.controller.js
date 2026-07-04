const Healthcare = require('../models/Healthcare');
const { success, error } = require('../utils/apiResponse');

exports.list = async (req, res, next) => {
  try {
    const data = await Healthcare.find({ isActive: true }).sort('order').lean();
    return success(res, data);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Healthcare.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return error(res, 'Healthcare item not found', 404);
    return success(res, item, 'Healthcare item updated');
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Healthcare.create(req.body);
    return success(res, item, 'Healthcare item created', 201);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Healthcare.findByIdAndDelete(req.params.id);
    if (!item) return error(res, 'Healthcare item not found', 404);
    return success(res, null, 'Healthcare item deleted');
  } catch (err) { next(err); }
};
