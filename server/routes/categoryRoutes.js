const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(protect, admin, createCategory).get(getCategories);

router
  .route("/:id")
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = router;
