const ContactMessage = require('../models/ContactMessage');
const { success, paginated } = require('../utils/apiResponse');
const { paginate, paginationMeta } = require('../utils/pagination');

exports.create = async (req, res, next) => {
  try {
    const message = await ContactMessage.create(req.body);
    return success(res, message, 'Message sent successfully', 201);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};
    if (req.query.isRead !== undefined) filter.isRead = req.query.isRead === 'true';
    const [data, total] = await Promise.all([
      ContactMessage.find(filter).skip(skip).limit(limit).sort('-createdAt').lean(),
      ContactMessage.countDocuments(filter),
    ]);
    return paginated(res, data, paginationMeta(total, page, limit));
  } catch (err) { next(err); }
};

exports.markRead = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    return success(res, message, 'Message marked as read');
  } catch (err) { next(err); }
};
