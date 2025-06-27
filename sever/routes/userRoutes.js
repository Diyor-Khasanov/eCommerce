const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  makeAdmin,
} = require("../controllers/userController");

const router = express.Router();

// Admin routes
router.route("/").get(protect, admin, getAllUsers);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/:id/admin").put(protect, admin, makeAdmin);

// User profile routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
