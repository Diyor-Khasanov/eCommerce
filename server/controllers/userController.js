const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Foydalanuvchi profilini olish
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};

// Foydalanuvchi profilini yangilash
exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

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

// Admin: Barcha foydalanuvchilar
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Admin: Foydalanuvchini o‘chirish
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Admin: Foydalanuvchini admin qilish
exports.makeAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = true;
    await user.save();
    res.json({ message: "User promoted to admin" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
