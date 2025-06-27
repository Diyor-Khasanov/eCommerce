const express = require("express");
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// YANGI
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;

const express = require("express");
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/authController");

const { protect, admin } = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/login", login);

router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

// 🛡 ADMIN ROUTES
router.route("/").get(protect, admin, getUsers);
router.route("/:id").get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser);

module.exports = router;

const { protect } = require("../middleware/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../controllers/authController");

router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

  const express = require("express");
const { register, login, getUsers } = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/login", login);

// Yangi: Barcha foydalanuvchilar (faqat admin)
router.get("/users", protect, admin, getUsers);

module.exports = router;
