const Service = require('../models/Service');
const { success, error } = require('../utils/apiResponse');

exports.list = async (req, res, next) => {
  try {
    const data = await Service.find({ isActive: true }).sort('order').lean();
    return success(res, data);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return error(res, 'Service not found', 404);
    return success(res, item, 'Service updated');
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Service.create(req.body);
    return success(res, item, 'Service created', 201);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Service.findByIdAndDelete(req.params.id);
    if (!item) return error(res, 'Service not found', 404);
    return success(res, null, 'Service deleted');
  } catch (err) { next(err); }
};
