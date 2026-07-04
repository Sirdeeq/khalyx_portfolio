const Media = require('../models/Media');
const { success } = require('../utils/apiResponse');

exports.get = async (req, res, next) => {
  try {
    let media = await Media.findOne({ isActive: true }).lean();
    if (!media) {
      media = await Media.create({
        title: 'Media Portfolio',
        timeline: [
          { title: 'Graphic Design', period: 'Where it all began', detail: 'Started as a freelance Graphic Designer.' },
          { title: 'Photography', period: 'Expanding the vision', detail: 'Expanded into Photography.' },
          { title: 'Multimedia Production', period: 'Full creative spectrum', detail: 'Developed skills in video editing, motion graphics.' },
        ],
        services: ['Graphic Design', 'Brand Identity Design', 'Social Media Content Design', 'Photography', 'Videography', 'Video Editing', 'Motion Graphics'],
      });
    }
    return success(res, media);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    let media = await Media.findOne({ isActive: true });
    if (!media) {
      media = new Media();
    }
    Object.assign(media, req.body);
    await media.save();
    return success(res, media, 'Media section updated');
  } catch (err) { next(err); }
};
