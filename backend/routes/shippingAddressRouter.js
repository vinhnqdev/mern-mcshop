import express from "express";
import ShippingAddressModel from "../models/shippingAddressModel.js";
import asyncHandler from "express-async-handler";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc    Create a Shipping Address
// @route   POST /api/addresses/
// @access  Private

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const address = new ShippingAddressModel({
        ...req.body,
        user: req.user._id,
      });
      await address.save();
      res.status(201);
      res.send(address);
    } catch (error) {
      res.status(400);
      throw new Error("Failed to create!!! ");
    }
  })
);

export default router;
