const About = require('../models/About');
const { success } = require('../utils/apiResponse');

exports.get = async (req, res, next) => {
  try {
    let about = await About.findOne({ isActive: true }).lean();
    if (!about) {
      about = await About.create({
        bio: "I'm Sadiq Baba Idris (Khalifa / Sirdurx), a Full Stack Developer, UI/UX Designer, Motion Graphics Designer and Creative Technologist from Kano, Nigeria.",
        passion: "I'm passionate about solving problems with technology, creating engaging visual content, and building products that improve lives.",
        values: ['Innovation', 'Simplicity', 'Community Impact', 'Learning', 'Leadership'],
      });
    }
    return success(res, about);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    let about = await About.findOne({ isActive: true });
    if (!about) {
      about = new About();
    }
    Object.assign(about, req.body);
    await about.save();
    return success(res, about, 'About section updated');
  } catch (err) { next(err); }
};
