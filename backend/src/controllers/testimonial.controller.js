const Testimonial = require('../models/Testimonial');
const { success, error } = require('../utils/apiResponse');

exports.list = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query._admin !== 'true') filter.isActive = true;
    const data = await Testimonial.find(filter).sort('order').lean();
    return success(res, data);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await Testimonial.findById(req.params.id).lean();
    if (!item) return error(res, 'Testimonial not found', 404);
    return success(res, item);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Testimonial.create(req.body);
    return success(res, item, 'Testimonial created', 201);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return error(res, 'Testimonial not found', 404);
    return success(res, item, 'Testimonial updated');
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return error(res, 'Testimonial not found', 404);
    return success(res, null, 'Testimonial deleted');
  } catch (err) { next(err); }
};
