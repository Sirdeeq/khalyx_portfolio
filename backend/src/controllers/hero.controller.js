const Hero = require('../models/Hero');
const { success, error } = require('../utils/apiResponse');

exports.get = async (req, res, next) => {
  try {
    let hero = await Hero.findOne({ isActive: true }).lean();
    if (!hero) {
      hero = await Hero.create({
        roles: ['Full Stack Developer', 'UI/UX Designer', 'Motion Graphics Designer', 'Content Creator', 'Healthcare Advocate'],
        tagline: 'I build modern web and mobile applications, create engaging visual content, and leverage technology to solve real-world challenges in education, healthcare, and digital businesses.',
        portrait: '',
      });
    }
    return success(res, hero);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    let hero = await Hero.findOne({ isActive: true });
    if (!hero) {
      hero = new Hero();
    }
    Object.assign(hero, req.body);
    await hero.save();
    return success(res, hero, 'Hero section updated');
  } catch (err) { next(err); }
};
