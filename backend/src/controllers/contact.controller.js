const ContactMessage = require('../models/ContactMessage');
const { success, paginated } = require('../utils/apiResponse');
const { paginate, paginationMeta } = require('../utils/pagination');
const { sendEmail } = require('../services/email.service');
const { sendWhatsApp } = require('../services/whatsapp.service');
const { replyEmailHTML } = require('../templates/replyEmail');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ssirdeeq@gmail.com';
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || '+2348027999992';

exports.create = async (req, res, next) => {
  try {
    const message = await ContactMessage.create(req.body);

    const msg =
      `Name: ${message.name}\nEmail: ${message.email}\nPhone: ${message.phone || 'N/A'}\n` +
      `Reason: ${message.reason || 'General'}\n\nMessage:\n${message.message}`;

    await Promise.allSettled([
      sendEmail({ to: ADMIN_EMAIL, subject: `[Portfolio] ${message.reason || 'Contact'} from ${message.name}`, text: msg }),
      sendWhatsApp({ to: ADMIN_WHATSAPP, body: `*New Contact*\n\n${msg}` }),
    ]);

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

exports.reply = async (req, res, next) => {
  try {
    const { reply } = req.body;
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { reply, isRead: true },
      { new: true }
    );

    const replyText = `Hi ${message.name},\n\n${reply}\n\nBest regards,\nSadiq Baba Idris`;
    const replyHTML = replyEmailHTML({ name: message.name, reply, reason: message.reason });

    await sendEmail({
      to: message.email,
      subject: `Re: ${message.reason || 'Your Message'}`,
      text: replyText,
      html: replyHTML,
    });

    return success(res, message, 'Reply sent successfully');
  } catch (err) { next(err); }
};
