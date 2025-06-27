const Category = require("../models/Category");

// ➕ Kategoriya qo'shish
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  const existing = await Category.findOne({ name });
  if (existing)
    return res.status(400).json({ message: "Category already exists" });

  const category = await Category.create({ name });
  res.status(201).json(category);
};

// 📄 Barcha kategoriyalar
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// 🔁 Kategoriyani yangilash
exports.updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    category.name = req.body.name || category.name;
    const updated = await category.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

// ❌ Kategoriyani o'chirish
exports.deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};
