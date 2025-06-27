// middlewares/uploadMiddleware.js

const multer = require("multer");
const path = require("path");

// Storage (optional, multer stores files in memory)
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    cb(new Error("Only images are allowed"), false);
    return;
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
