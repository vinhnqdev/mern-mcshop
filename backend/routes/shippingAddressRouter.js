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

// @desc    Update My Address
// @route   PATCH /api/addresses/me/:id
// @access  Private

router.patch(
  "/me/:id",
  auth,
  asyncHandler(async (req, res) => {
    const address = await ShippingAddress.findById(req.params.id);

    // Kiểm tra các trường req.body gửi lên có khớp với các trường trong model không?
    const addressBodyField = Object.keys(req.body);
    const userModelField = [
      "name",
      "phone",
      "city",
      "district",
      "ward",
      "address",
      "typeOfAddress",
      "isDefault",
    ];

    const isValidOperation = addressBodyField.every((field) => userModelField.includes(field));

    if (!isValidOperation) {
      res.status(400);
      throw new Error("Invalid update");
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
      res.send({ message: "Failed to delete user" });
    }
  })
);

export default router;
