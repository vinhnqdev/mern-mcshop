import express from "express";
import ShippingAddress from "../models/shippingAddressModel.js";
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
      if (req.body.isDefault) {
        await ShippingAddress.updateMany(
          { isDefault: true, user: req.user._id },
          { $set: { isDefault: false } }
        );
      }
      const address = new ShippingAddress({
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
