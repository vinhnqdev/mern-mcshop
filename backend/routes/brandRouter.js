import express from "express";
import Brand from "../models/brandModel.js";
import asyncHandler from "express-async-handler";
import { admin, auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Create A Brand
// @route   POST /api/brands
// @access   POST Private/Admin

router.post(
  "/",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const brand = new Brand(req.body);
      await brand.save();
      res.send(brand);
    } catch (error) {
      res.status(500).send();
    }
  })
);

// @desc    Get BrandList
// @route   GET /api/brands
// @access   GET Public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const brands = await Brand.find({});
      res.send(brands);
    } catch (error) {
      throw new Error("Failed to fetch.");
    }
  })
);

export default router;
