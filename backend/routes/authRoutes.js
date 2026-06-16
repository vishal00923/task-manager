const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  uploadUserProfilePic,
  updateProfilePicture,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Auth Routes
router.post('/register', registerUser); // Register user
router.post('/login', loginUser); // Login user
router.get('/profile', protect, getUserProfile); // Get user profile
router.put('/profile', protect, updateUserProfile); // Update user profile
router.post('/upload-image', upload.single('image'), updateProfilePicture); // Update user profile picture

module.exports = router;
