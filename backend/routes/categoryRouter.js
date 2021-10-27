import express from "express";
import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import { admin, auth } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc    Create Category
// @route   POST /api/categories
// @access   POST Private/Admin

router.post(
  "/",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.send(category);
    } catch (error) {
      res.status(500).send();
    }
  })
);

// @desc    Get Categories List
// @route   GET /api/categories
// @access   GET Public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const categories = await Category.find({});
      res.send(categories);
    } catch (error) {
      throw new Error("Failed to fetch.");
    }
  })
);

export default router;
