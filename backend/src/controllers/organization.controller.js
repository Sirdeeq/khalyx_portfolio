const Organization = require('../models/Organization');
const { success, error } = require('../utils/apiResponse');

exports.list = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query._admin !== 'true') filter.isActive = true;
    const data = await Organization.find(filter).sort('order').lean();
    return success(res, data);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await Organization.findById(req.params.id).lean();
    if (!item) return error(res, 'Organization not found', 404);
    return success(res, item);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Organization.create(req.body);
    return success(res, item, 'Organization created', 201);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return error(res, 'Organization not found', 404);
    return success(res, item, 'Organization updated');
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Organization.findByIdAndDelete(req.params.id);
    if (!item) return error(res, 'Organization not found', 404);
    return success(res, null, 'Organization deleted');
  } catch (err) { next(err); }
};
