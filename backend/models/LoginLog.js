const mongoose = require('mongoose');

const loginLogSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String, default: 'Unknown' },
  emailOrPhone: { type: String, required: true },
  role: { type: String, default: 'staff' },
  ipAddress: { type: String, default: '127.0.0.1' },
  userAgent: { type: String, default: 'Unknown Device' },
  status: { type: String, enum: ['SUCCESS', 'FAILED'], required: true },
  failureReason: { type: String },
}, { timestamps: true });

const LoginLog = mongoose.model('LoginLog', loginLogSchema);
module.exports = LoginLog;
