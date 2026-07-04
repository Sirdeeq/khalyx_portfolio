const Project = require('../models/Project');
const { success, error, paginated } = require('../utils/apiResponse');
const { paginate, paginationMeta } = require('../utils/pagination');

exports.list = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = { isActive: true };
    const [data, total] = await Promise.all([
      Project.find(filter).skip(skip).limit(limit).sort('order num').lean(),
      Project.countDocuments(filter),
    ]);
    return paginated(res, data, paginationMeta(total, page, limit));
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) return error(res, 'Project not found', 404);
    return success(res, project);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    return success(res, project, 'Project created', 201);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return error(res, 'Project not found', 404);
    return success(res, project, 'Project updated');
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return error(res, 'Project not found', 404);
    return success(res, null, 'Project deleted');
  } catch (err) { next(err); }
};
