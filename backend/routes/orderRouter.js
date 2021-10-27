import express from "express";
import asyncHandler from "express-async-handler";
import { admin, auth } from "../middleware/authMiddleware.js";
import Order from "../models/orderModel.js";

const router = express.Router();

// @desc    Create a User Order
// @route   POST /api/orders/
// @access   POST Private

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { cart, shippingAddress, paymentMethod, totalPrice, isPaid } = req.body;

    if (cart && cart.length === 0) {
      res.status(400);
      throw new Error("Giỏ hàng trống.");
    }
    const orderItems = cart.map((item) => {
      item.productId = item._id;

      delete item._id;
      return item;
    });

    try {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        isPaid,
      });

      if (order.isPaid) {
        order.paidAt = Date.now();
      }

      await order.save();
      res.status(201);
      res.send(order);
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("Có lỗi khi thanh toán");
    }
  })
);

// @desc    Get all of orders
// @route   GET /api/orders/me
// @access   GET Private

router.get(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  })
);

// @desc    Get orderList
// @route   GET /api/orders/
// @access   GET Private/Admin

router.get(
  "/",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({}).populate({ path: "user", select: "name email" });

      res.send(orders);
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  })
);

// @desc    Get order By Id
// @route   GET /api/orders/:id
// @access   GET Private

router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("user", "name email");

      if (!order) {
        res.status(404);
        return res.send({ message: "Đơn hàng không tìm thấy" });
      }
      res.send(order);
    } catch (error) {
      res.status(401);
      throw new Error("Fail to fetch.");
    }
  })
);

// @desc    Edit pay Status
// @route   PATCH /api/orders/:id/pay
// @access   PATCH Private/Admin

router.patch(
  "/:id/pay",
  asyncHandler(async (req, res) => {
    const order = Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Đơn hàng không được tìm thấy");
    }

    const { id, status, update_time, email_address } = req.body;
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address,
    };

    const updatedOrder = await order.save();
    res.send(update_time);
  })
);

// @desc    Edit Delivered Status
// @route   PATCH /api/orders/:id/delivered
// @access   PATCH Private/Admin

router.patch(
  "/:id/delivered",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Đơn hàng không được tìm thấy");
    }

    if (order.paymentMethod === "cod") {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.send(updatedOrder);
  })
);

export default router;
