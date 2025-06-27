const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, isAdmin }); // <-- isAdmin qabul qilish

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id, user.isAdmin),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};

const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, admin, createProduct).get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// YANGI
router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;

const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, admin, createProduct).get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// YANGI
router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;

const express = require("express");
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

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
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// YANGI
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin =
      req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id, updatedUser.isAdmin),
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const { protect } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
