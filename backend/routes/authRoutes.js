const express = require('express');
const router = express.Router();
const {
  resetAllAccounts,
  registerUser,
  resendOTP,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

router.post('/reset-accounts', resetAllAccounts);
router.post('/register', registerUser);
router.post('/resend-otp', resendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
