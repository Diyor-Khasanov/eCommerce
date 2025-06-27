const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get("/", getProducts);

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post("/", protect, admin, createProduct);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get("/:id", getProductById);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put("/:id", protect, admin, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
