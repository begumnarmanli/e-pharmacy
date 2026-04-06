import Product from "../models/Product.js";

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search.trim(), $options: "i" };
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { id, name, photo, suppliers, stock, price, category } = req.body;

    const product = await Product.create({
      id,
      name,
      photo,
      suppliers,
      stock,
      price,
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Product could not be added.: " + error.message });
  }
};
