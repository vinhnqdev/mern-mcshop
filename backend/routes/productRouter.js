import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access   GET Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.send(products);
  })
);

// @desc    Fetch the product by id
// @route   GET /api/products/:id
// @access   GET Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.populate("brand");
      res.send(product);
    } else {
      res.status(404);
      throw new Error("Product not found.");
    }
  })
);

export default router;
