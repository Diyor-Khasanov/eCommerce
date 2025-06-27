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

router.get("/category/:categoryId", getProductsByCategory);
