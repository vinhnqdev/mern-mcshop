import express from "express";
import ShippingAddress from "../models/shippingAddressModel.js";
import asyncHandler from "express-async-handler";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc    Create a Shipping Address
// @route   POST /api/addresses/me
// @access  Private

router.post(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const count = await ShippingAddress.countDocuments({ user: req.user._id });
      if (!req.body.isDefault && count === 0) {
        req.body.isDefault = true;
      }
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

// @desc    Get user address by id
// @route   GET /api/addresses/me/:id
// @access  Private
router.get(
  "/me/:id",
  auth,
  asyncHandler(async (req, res) => {
    const address = await ShippingAddress.find({ user: req.user._id, _id: req.params.id });
    if (address.length === 0) {
      res.status(404);
      throw Error("Không tìm thấy địa chỉ");
    }
    res.send(address[0]);
  })
);

// @desc    Update My Address
// @route   PATCH /api/addresses/me/:id
// @access  Private

router.patch(
  "/me/:id",
  auth,
  asyncHandler(async (req, res) => {
    const address = await ShippingAddress.findById(req.params.id);
    const userAddresses = await ShippingAddress.find({ user: req.user._id });
    let addressBodyField = Object.keys(req.body);
    if (address.isDefault && !req.body.isDefault) {
      addressBodyField = addressBodyField.filter((addressField) => addressField !== "isDefault");
    }
    if (req.body.isDefault && !address.isDefault) {
      userAddresses.forEach(async (address) => {
        if (address.isDefault) {
          address.isDefault = false;
          await address.save();
        }
      });
    }

    addressBodyField.forEach((field) => (address[field] = req.body[field]));

    try {
      await address.save();
      res.send(address);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to update");
    }
  })
);

// @desc    Remove User Address
// @route   DELETE /api/address/me/:id
// @access  Private

router.delete(
  "/me/:id",
  auth,
  asyncHandler(async (req, res) => {
    const { deletedCount } = await ShippingAddress.deleteOne({
      user: req.user._id,
      _id: req.params.id,
    });
    if (deletedCount !== 0) {
      res.send({ message: "User deleted" });
    } else {
      res.status(400);
      res.send({ message: "Xoá địa chỉ thất bại" });
    }
  })
);

export default router;
