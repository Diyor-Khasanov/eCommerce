const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  makeAdmin,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

// Foydalanuvchi profili
router
  .route("/profile")
  .get(protect, getUserProfile) // Profilni ko‘rish
  .put(protect, updateUserProfile); // Profilni tahrirlash

// Admin routes
router.route("/").get(protect, admin, getUsers); // Barcha foydalanuvchilar

router
  .route("/:id")
  .delete(protect, admin, deleteUser) // Foydalanuvchini o‘chirish
  .put(protect, admin, makeAdmin); // Foydalanuvchini admin qilish

module.exports = router;
