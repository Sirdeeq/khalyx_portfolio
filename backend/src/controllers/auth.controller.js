const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { success, error } = require('../utils/apiResponse');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return error(res, 'Invalid email or password', 401);
    }
    if (!user.isActive) {
      return error(res, 'Account deactivated', 401);
    }
    const token = generateToken({ id: user._id, role: user.role });
    return success(res, { user, token }, 'Login successful');
  } catch (err) { next(err); }
};

exports.getMe = async (req, res, next) => {
  try {
    return success(res, req.user);
  } catch (err) { next(err); }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return error(res, 'Current password is incorrect', 400);
    }
    user.password = req.body.newPassword;
    await user.save();
    return success(res, null, 'Password changed successfully');
  } catch (err) { next(err); }
};
