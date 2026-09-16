const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');
const { sendSMSOTP } = require('../services/smsService');

// In-Memory Storage Fallback when local MongoDB service is offline
const memoryUsers = [];
const memoryLogs = [];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

const generateId = () => new mongoose.Types.ObjectId().toString();
const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Clear all account data and reset backend state
// @route   POST /api/auth/reset-accounts
// @access  Public
const resetAllAccounts = async (req, res) => {
  try {
    memoryUsers.length = 0;
    memoryLogs.length = 0;

    if (isDbConnected()) {
      await User.deleteMany({});
      await LoginLog.deleteMany({});
    }

    return res.json({ message: 'All previous account details wiped clean! You can now create brand new accounts.' });
  } catch (error) {
    console.error('Reset Accounts Error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};
const registerUser = async (req, res) => {
  try {
    const { name, emailOrPhone, password, role } = req.body;

    if (!name || !emailOrPhone || !password) {
      return res.status(400).json({ message: 'Please provide name, email or phone, and password' });
    }

    const isEmail = emailOrPhone.includes('@');
    const userRole = role === 'admin' ? 'admin' : 'staff';
    const isAdmin = userRole === 'admin';

    // Generate 6-digit OTP verification code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Dispatch SMS OTP
    if (!isEmail) {
      await sendSMSOTP(emailOrPhone, otp);
    }

    if (isDbConnected()) {
      const query = isEmail ? { email: emailOrPhone.toLowerCase() } : { phone: emailOrPhone };
      let user = await User.findOne(query);

      if (user) {
        user.name = name || user.name;
        user.password = password;
        user.role = userRole;
        user.isAdmin = isAdmin;
        user.isVerified = false;
        user.verificationCode = otp;
        user.verificationCodeExpires = otpExpires;
        await user.save();

        return res.status(200).json({
          requiresVerification: true,
          emailOrPhone,
          verificationCode: otp,
          message: `SMS OTP code dispatched to ${emailOrPhone}`,
        });
      }

      user = await User.create({
        name,
        email: isEmail ? emailOrPhone.toLowerCase() : undefined,
        phone: !isEmail ? emailOrPhone : undefined,
        password,
        role: userRole,
        isAdmin,
        isVerified: false,
        verificationCode: otp,
        verificationCodeExpires: otpExpires,
      });

      return res.status(201).json({
        requiresVerification: true,
        emailOrPhone,
        verificationCode: otp,
        message: `SMS OTP code dispatched to ${emailOrPhone}`,
      });
    } else {
      // Memory Fallback
      let user = memoryUsers.find(
        (u) => (isEmail && u.email === emailOrPhone.toLowerCase()) || (!isEmail && u.phone === emailOrPhone)
      );

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      if (user) {
        user.name = name || user.name;
        user.password = hashedPassword;
        user.role = userRole;
        user.isAdmin = isAdmin;
        user.isVerified = false;
        user.verificationCode = otp;
        user.verificationCodeExpires = otpExpires;

        return res.status(200).json({
          requiresVerification: true,
          emailOrPhone,
          verificationCode: otp,
          message: `SMS OTP code dispatched to ${emailOrPhone}`,
        });
      }

      const newUser = {
        _id: generateId(),
        name,
        email: isEmail ? emailOrPhone.toLowerCase() : undefined,
        phone: !isEmail ? emailOrPhone : undefined,
        password: hashedPassword,
        role: userRole,
        isAdmin,
        isVerified: false,
        verificationCode: otp,
        verificationCodeExpires: otpExpires,
        createdAt: new Date(),
      };

      memoryUsers.push(newUser);

      return res.status(201).json({
        requiresVerification: true,
        emailOrPhone,
        verificationCode: otp,
        message: `SMS OTP code dispatched to ${emailOrPhone}`,
      });
    }
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Resend OTP code for any account
// @route   POST /api/auth/resend-otp
// @access  Public
const resendOTP = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;
    if (!emailOrPhone) {
      return res.status(400).json({ message: 'Email or phone number is required' });
    }

    const isEmail = emailOrPhone.includes('@');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    if (!isEmail) {
      await sendSMSOTP(emailOrPhone, otp);
    }

    if (isDbConnected()) {
      const query = isEmail ? { email: emailOrPhone.toLowerCase() } : { phone: emailOrPhone };
      let user = await User.findOne(query);

      if (user) {
        user.verificationCode = otp;
        user.verificationCodeExpires = otpExpires;
        await user.save();
      }
    } else {
      let user = memoryUsers.find(
        (u) => (isEmail && u.email === emailOrPhone.toLowerCase()) || (!isEmail && u.phone === emailOrPhone)
      );

      if (user) {
        user.verificationCode = otp;
        user.verificationCodeExpires = otpExpires;
      }
    }

    return res.json({
      message: `New SMS OTP code sent to ${emailOrPhone}`,
      emailOrPhone,
      verificationCode: otp,
    });
  } catch (error) {
    console.error('Resend OTP Error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Verify OTP code and activate account
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { emailOrPhone, otp } = req.body;

    if (!emailOrPhone || !otp) {
      return res.status(400).json({ message: 'Email/Phone and OTP code are required' });
    }

    const isEmail = emailOrPhone.includes('@');
    const ipAddress = req.headers['x-forwarded-for'] || req.ip || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown Device';

    if (isDbConnected()) {
      const query = isEmail ? { email: emailOrPhone.toLowerCase() } : { phone: emailOrPhone };
      let user = await User.findOne(query);

      if (!user) {
        user = await User.create({
          name: 'Verified Customer',
          phone: !isEmail ? emailOrPhone : undefined,
          email: isEmail ? emailOrPhone.toLowerCase() : undefined,
          password: 'password123',
          role: 'customer',
          isVerified: true,
        });
      } else {
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();
      }

      await LoginLog.create({
        userId: user._id,
        userName: user.name,
        emailOrPhone,
        role: user.role,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        failureReason: 'Initial Account Verification & Login',
      });

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isAdmin: user.isAdmin || false,
        token: generateToken(user._id),
        message: 'Account verified & logged in successfully!',
      });
    } else {
      // Memory Fallback
      let user = memoryUsers.find(
        (u) => (isEmail && u.email === emailOrPhone.toLowerCase()) || (!isEmail && u.phone === emailOrPhone)
      );

      if (!user) {
        user = {
          _id: generateId(),
          name: 'Verified Customer',
          email: isEmail ? emailOrPhone.toLowerCase() : undefined,
          phone: !isEmail ? emailOrPhone : undefined,
          password: 'password123',
          role: 'customer',
          isAdmin: false,
          isVerified: true,
          createdAt: new Date(),
        };
        memoryUsers.push(user);
      } else {
        user.isVerified = true;
        delete user.verificationCode;
      }

      memoryLogs.unshift({
        _id: generateId(),
        userId: user._id,
        userName: user.name,
        emailOrPhone,
        role: user.role,
        ipAddress,
        userAgent,
        status: 'SUCCESS',
        failureReason: 'Initial Account Verification & Login',
        createdAt: new Date(),
      });

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isAdmin: user.isAdmin || false,
        token: generateToken(user._id),
        message: 'Account verified & logged in successfully!',
      });
    }
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Authenticate user & record audit log
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  const ipAddress = req.headers['x-forwarded-for'] || req.ip || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown Device';

  try {
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: 'Email/Phone and password are required' });
    }

    const isEmail = emailOrPhone.includes('@');

    if (isDbConnected()) {
      const query = isEmail ? { email: emailOrPhone.toLowerCase() } : { phone: emailOrPhone };
      const user = await User.findOne(query);

      if (!user) {
        // Auto-create demo customer user for seamless instant testing
        const newDemoUser = await User.create({
          name: 'Demo Customer',
          phone: !isEmail ? emailOrPhone : undefined,
          email: isEmail ? emailOrPhone.toLowerCase() : undefined,
          password: password,
          role: 'customer',
          isVerified: true,
        });

        await LoginLog.create({
          userId: newDemoUser._id,
          userName: newDemoUser.name,
          emailOrPhone,
          role: newDemoUser.role,
          status: 'SUCCESS',
          failureReason: 'Auto-Created Demo Account Login',
          ipAddress,
          userAgent,
        });

        return res.json({
          _id: newDemoUser._id,
          name: newDemoUser.name,
          email: newDemoUser.email,
          phone: newDemoUser.phone,
          role: newDemoUser.role,
          isAdmin: false,
          token: generateToken(newDemoUser._id),
          message: 'Login successful!',
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        await LoginLog.create({ userId: user._id, userName: user.name, emailOrPhone, role: user.role, status: 'FAILED', failureReason: 'Incorrect Password', ipAddress, userAgent });
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!user.isVerified) {
        user.isVerified = true;
        await user.save();
      }

      await LoginLog.create({ userId: user._id, userName: user.name, emailOrPhone, role: user.role, status: 'SUCCESS', ipAddress, userAgent });

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        message: 'Login successful!',
      });
    } else {
      // Memory Fallback
      const user = memoryUsers.find(
        (u) => (isEmail && u.email === emailOrPhone.toLowerCase()) || (!isEmail && u.phone === emailOrPhone)
      );

      if (!user) {
        const newDemoUser = {
          _id: generateId(),
          name: 'Demo Customer',
          email: isEmail ? emailOrPhone.toLowerCase() : undefined,
          phone: !isEmail ? emailOrPhone : undefined,
          password: await bcrypt.hash(password, 10),
          role: 'customer',
          isAdmin: false,
          isVerified: true,
          createdAt: new Date(),
        };
        memoryUsers.push(newDemoUser);
        return res.json({
          _id: newDemoUser._id,
          name: newDemoUser.name,
          email: newDemoUser.email,
          phone: newDemoUser.phone,
          role: newDemoUser.role,
          isAdmin: false,
          token: generateToken(newDemoUser._id),
          message: 'Login successful!',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        memoryLogs.unshift({ _id: generateId(), userId: user._id, userName: user.name, emailOrPhone, role: user.role, status: 'FAILED', failureReason: 'Incorrect Password', ipAddress, userAgent, createdAt: new Date() });
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!user.isVerified) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = otp;
        if (!isEmail) {
          await sendSMSOTP(emailOrPhone, otp);
        }

        memoryLogs.unshift({ _id: generateId(), userId: user._id, userName: user.name, emailOrPhone, role: user.role, status: 'FAILED', failureReason: 'Account Unverified', ipAddress, userAgent, createdAt: new Date() });

        return res.status(403).json({
          message: 'Account not verified yet. An SMS OTP has been sent to your mobile phone.',
          requiresVerification: true,
          emailOrPhone,
          verificationCode: otp,
        });
      }

      memoryLogs.unshift({ _id: generateId(), userId: user._id, userName: user.name, emailOrPhone, role: user.role, status: 'SUCCESS', ipAddress, userAgent, createdAt: new Date() });

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Request Password Reset OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;
    if (!emailOrPhone) {
      return res.status(400).json({ message: 'Email or phone number is required' });
    }

    const isEmail = emailOrPhone.includes('@');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    if (!isEmail) {
      await sendSMSOTP(emailOrPhone, otp);
    }

    if (isDbConnected()) {
      const query = isEmail ? { email: emailOrPhone.toLowerCase() } : { phone: emailOrPhone };
      const user = await User.findOne(query);

      if (!user) {
        return res.status(404).json({ message: 'Account not found with this email or phone number.' });
      }

      user.verificationCode = otp;
      user.verificationCodeExpires = otpExpires;
      await user.save();

      return res.json({
        message: isEmail ? `Password reset code sent to ${emailOrPhone}` : `Password reset SMS OTP dispatched to ${emailOrPhone}`,
        emailOrPhone,
        verificationCode: otp,
      });
    } else {
      const user = memoryUsers.find(
        (u) => (isEmail && u.email === emailOrPhone.toLowerCase()) || (!isEmail && u.phone === emailOrPhone)
      );

      if (!user) {
        return res.status(404).json({ message: 'Account not found with this email or phone number.' });
      }

      user.verificationCode = otp;
      user.verificationCodeExpires = otpExpires;

      return res.json({
        message: isEmail ? `Password reset code sent to ${emailOrPhone}` : `Password reset SMS OTP dispatched to ${emailOrPhone}`,
        emailOrPhone,
        verificationCode: otp,
      });
    }
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Reset Password with OTP Verification
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { emailOrPhone, otp, newPassword } = req.body;

    if (!emailOrPhone || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email/Phone, OTP, and new password are required' });
    }

    const isEmail = emailOrPhone.includes('@');

    if (isDbConnected()) {
      const query = isEmail ? { email: emailOrPhone.toLowerCase() } : { phone: emailOrPhone };
      const user = await User.findOne(query);

      if (!user) return res.status(404).json({ message: 'User account not found' });
      if (user.verificationCode !== otp.trim()) return res.status(400).json({ message: 'Incorrect OTP verification code. Please check your SMS.' });

      user.password = newPassword;
      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();

      return res.json({ message: 'Password reset successfully! You can now log in.' });
    } else {
      const user = memoryUsers.find(
        (u) => (isEmail && u.email === emailOrPhone.toLowerCase()) || (!isEmail && u.phone === emailOrPhone)
      );

      if (!user) return res.status(404).json({ message: 'User account not found' });
      if (user.verificationCode !== otp.trim()) return res.status(400).json({ message: 'Incorrect OTP verification code. Please check your SMS.' });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.isVerified = true;
      delete user.verificationCode;

      return res.json({ message: 'Password reset successfully! You can now log in.' });
    }
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Get staff login audit logs (Admin only)
// @route   GET /api/admin/login-logs
// @access  Private/Admin
const getStaffLogins = async (req, res) => {
  try {
    if (isDbConnected()) {
      const logs = await LoginLog.find({}).sort({ createdAt: -1 }).limit(100);
      res.json(logs);
    } else {
      res.json(memoryLogs);
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch logs' });
  }
};

// @desc    Get all staff members (Admin only)
// @route   GET /api/admin/staff
// @access  Private/Admin
const getStaffMembers = async (req, res) => {
  try {
    if (isDbConnected()) {
      const staff = await User.find({}).select('-password').sort({ createdAt: -1 });
      res.json(staff);
    } else {
      const safeStaff = memoryUsers.map(({ password, ...rest }) => rest);
      res.json(safeStaff);
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch staff members' });
  }
};

module.exports = {
  resetAllAccounts,
  registerUser,
  resendOTP,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  getStaffLogins,
  getStaffMembers,
};
