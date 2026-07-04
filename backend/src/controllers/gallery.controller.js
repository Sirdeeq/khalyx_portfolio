const Gallery = require('../models/Gallery');
const { success, error, paginated } = require('../utils/apiResponse');
const { paginate, paginationMeta } = require('../utils/pagination');

exports.list = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = { isActive: true };
    const [data, total] = await Promise.all([
      Gallery.find(filter).skip(skip).limit(limit).sort('order').lean(),
      Gallery.countDocuments(filter),
    ]);
    return paginated(res, data, paginationMeta(total, page, limit));
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return error(res, 'Gallery item not found', 404);
    return success(res, item, 'Gallery item updated');
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    return success(res, item, 'Gallery item created', 201);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return error(res, 'Gallery item not found', 404);
    return success(res, null, 'Gallery item deleted');
  } catch (err) { next(err); }
};
