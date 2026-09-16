const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getStaffLogins,
  getStaffMembers,
} = require('../controllers/authController');

router.get('/login-logs', protect, admin, getStaffLogins);
router.get('/staff', protect, admin, getStaffMembers);

module.exports = router;
