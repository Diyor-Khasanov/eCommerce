// Barcha productlarni olish - search, filter, sort, pagination bilan
exports.getProducts = async (req, res) => {
  try {
    const pageSize = 6; // Har bir sahifada 6 ta mahsulot
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const minPrice = req.query.minPrice
      ? { price: { $gte: req.query.minPrice } }
      : {};
    const maxPrice = req.query.maxPrice
      ? { price: { $lte: req.query.maxPrice } }
      : {};

    const sortOrder =
      req.query.sort === "highest"
        ? { price: -1 }
        : req.query.sort === "lowest"
        ? { price: 1 }
        : { createdAt: -1 };

    const count = await Product.countDocuments({
      ...keyword,
      ...category,
      ...minPrice,
      ...maxPrice,
    });

    const products = await Product.find({
      ...keyword,
      ...category,
      ...minPrice,
      ...maxPrice,
    })
      .sort(sortOrder)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

exports.createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // User oldin review qoldirganmi?
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, image, countInStock, category } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    image,
    countInStock,
    category,
  });

  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("category", "name");
  res.json(products);
};

exports.getProductsByCategory = async (req, res) => {
  const products = await Product.find({ category: req.params.categoryId }).populate("category", "name");
  res.json(products);
};
