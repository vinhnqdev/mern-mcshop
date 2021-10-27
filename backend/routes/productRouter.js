import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { admin, auth } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access   GET Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
      .populate({ path: "category", select: "name" })
      .populate({ path: "brand", select: "name" });

    res.send(products);
  })
);

// @desc    Fetch the product by id
// @route   GET /api/products/:id
// @access   GET Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
      .populate({ path: "category", select: "name" })
      .populate({ path: "brand", select: "name" });
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      throw new Error("Product not found.");
    }
  })
);

// @desc    Create a product
// @route   POST /api/products/
// @access   POST Private/Admin

router.post(
  "/",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const product = new Product({
        ...req.body,
        user: req.user._id,
      });
      await product.save();
      res.status(201);
      res.send(product);
    } catch (error) {
      res.status(400);
      throw new Error("Failed to create a product");
    }
  })
);

// @desc    Update Product (ADMIN)
// @route   Patch /api/products/:id
// @access  Private/Admin

router.patch(
  "/:id",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Not found");
    }

    const productBodyField = Object.keys(req.body);
    const productModelField = [
      "name",
      "price",
      "images",
      "description",
      "brand",
      "category",
      "countInStock",
      "guaranteeNum",
      "discount",
    ];

    const isValidOperation = productBodyField.every((field) => productModelField.includes(field));

    if (!isValidOperation) {
      res.status(400);
      throw new Error("Invalid update");
    }

    productBodyField.forEach((field) => (product[field] = req.body[field]));
    try {
      await product.save();

      res.send(product);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to fetch.");
    }
  })
);

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access   DELETE Private/Admin

router.delete(
  "/:id",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const { deletedCount } = await Product.deleteOne({ _id: req.params.id });
    if (deletedCount !== 0) {
      res.send({ message: "Xoá sản phẩm thành công" });
    } else {
      res.status(400);
      res.send({ message: "Xoá sản phẩm không thành công" });
    }
  })
);

export default router;
