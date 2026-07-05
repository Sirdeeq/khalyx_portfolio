const FutureProject = require('../models/FutureProject');
const { success, error } = require('../utils/apiResponse');

exports.list = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query._admin !== 'true') filter.isActive = true;
    const data = await FutureProject.find(filter).sort('order').lean();
    return success(res, data);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await FutureProject.findById(req.params.id).lean();
    if (!item) return error(res, 'Future project not found', 404);
    return success(res, item);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await FutureProject.create(req.body);
    return success(res, item, 'Future project created', 201);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await FutureProject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return error(res, 'Future project not found', 404);
    return success(res, item, 'Future project updated');
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await FutureProject.findByIdAndDelete(req.params.id);
    if (!item) return error(res, 'Future project not found', 404);
    return success(res, null, 'Future project deleted');
  } catch (err) { next(err); }
};
