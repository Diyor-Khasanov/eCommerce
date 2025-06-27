

const cloudinary = require("../config/cloudinary");

exports.uploadProductImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Image upload failed", error: err.message });
  }
};
