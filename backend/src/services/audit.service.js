const AuditLog = require('../models/AuditLog');

exports.log = async ({ userId, action, resource, resourceId, details, ip }) => {
  try {
    await AuditLog.create({ userId, action, resource, resourceId, details, ip });
  } catch (err) {
    console.error('Audit log error:', err.message);
  }
};
