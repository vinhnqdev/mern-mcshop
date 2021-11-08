import express, { raw } from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { admin, auth } from "../middleware/authMiddleware.js";
import { ObjectId } from "mongodb";
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products?search="abc"
// @access   GET Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const search = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    let priceRange = {};

    if (req.query.price_gte && req.query.price_lte) {
      const { price_gte, price_lte } = req.query;
      priceRange = {
        price: {
          $gte: price_gte,
          $lte: price_lte,
        },
      };
    }

    let rating = {};

    if (req.query.rating_gte && req.query.rating_lte) {
      const { rating_gte, rating_lte } = req.query;
      rating = {
        rating: {
          $gte: rating_gte,
          $lt: rating_lte,
        },
      };
    }

    if (req.query.rating) {
      rating = {
        rating: req.query.rating,
      };
    }

    const category = req.query.category
      ? {
          category: ObjectId(req.query.category),
        }
      : {};

    const brand = req.query.brand
      ? {
          brand: ObjectId(req.query.brand),
        }
      : {};

    // Sorting
    const sort = req.query.sort
      ? {
          [req.query.sort]: req.query.order || "asc",
        }
      : {};

    // Paginating
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const count = await Product.countDocuments({
      ...search,
      ...priceRange,
      ...rating,
      ...category,
      ...brand,
    });
    const products = await Product.find({
      ...search,
      ...priceRange,
      ...rating,
      ...category,
      ...brand,
    })
      .sort({ ...sort })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "brand",
        select: "name",
      });

    res.send({
      products,
      pagination: {
        page,
        limit,
        total: count,
      },
    });
  })
);

// @desc    Product Review
// @route   POST /api/products/:id/review
// @access   POST Private

router.post(
  "/:id/review",
  auth,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    const productReviewedByUser = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (productReviewedByUser) {
      return res.status(400).send({ message: "You reviewed for this product" });
    }

    const { title, rating, comment } = req.body;
    const review = {
      name: req.user.name,
      title,
      rating,
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReview += 1;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).send({ message: "Bình luận thành công" });
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
    console.log("RUNNING");
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
      "descriptions",
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
