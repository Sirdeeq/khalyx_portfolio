const Blog = require('../models/Blog');
const { success, error, paginated } = require('../utils/apiResponse');
const { paginate, paginationMeta } = require('../utils/pagination');

exports.list = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};
    if (req.query._admin !== 'true') filter.isPublished = true;
    const [data, total] = await Promise.all([
      Blog.find(filter).skip(skip).limit(limit).sort('-createdAt').select('-content').lean(),
      Blog.countDocuments(filter),
    ]);
    return paginated(res, data, paginationMeta(total, page, limit));
  } catch (err) { next(err); }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const item = await Blog.findOne({ slug: req.params.slug }).lean();
    if (!item) return error(res, 'Blog not found', 404);
    return success(res, item);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await Blog.findById(req.params.id).lean();
    if (!item) return error(res, 'Blog not found', 404);
    return success(res, item);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await Blog.create(req.body);
    return success(res, item, 'Blog post created', 201);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return error(res, 'Blog not found', 404);
    return success(res, item, 'Blog post updated');
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Blog.findByIdAndDelete(req.params.id);
    if (!item) return error(res, 'Blog not found', 404);
    return success(res, null, 'Blog post deleted');
  } catch (err) { next(err); }
};
