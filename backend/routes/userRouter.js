import express from "express";
import User from "../models/userModel.js";

import asyncHandler from "express-async-handler";
import { auth, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc    User Login
// @route   POST /api/users/login
// @access  Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      res.send({
        user,
        token,
      });
    } catch (error) {
      res.status(401);
      throw new Error("Sai email hoặc mật khẩu");
    }
  })
);

// @desc    User Signup
// @route   POST /api/users/signup
// @access  Public
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    try {
      const user = new User(req.body);
      const token = await user.generateAuthToken();
      await user.save();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400);
      throw Error("Email đã tồn tại");
    }
  })
);

// @desc    User Profile
// @route   GET /api/users/me
// @access  Private

router.get(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      console.log("NOT FOUND!!!");
      res.status(404);
      throw new Error("Failed to auth!!");
    }
    res.send(req.user);
  })
);

// @desc    Get User Address
// @route   GET /api/users/addresses
// @access  Private
router.get(
  "/addresses",
  auth,
  asyncHandler(async (req, res) => {
    await req.user.populate("addresses");
    res.send(req.user.addresses);
  })
);

// @desc    User Update
// @route   PATCH /api/users/update/me
// @access  Private

router.patch(
  "/update/me",
  auth,
  asyncHandler(async (req, res) => {
    const user = req.user;

    const matchedEmailUser = await User.find({ email: req.body.email });
    if (matchedEmailUser.length !== 0) {
      res.status(400);
      return res.send({ message: "Email đã tồn tại." });
    }

    // Kiểm tra các trường req.body gửi lên có khớp với các trường trong model không?
    const userBodyField = Object.keys(req.body);
    const userModelField = ["name", "email", "password"];

    const isValidOperation = userBodyField.every((field) => userModelField.includes(field));

    if (!isValidOperation) {
      res.status(400);
      throw new Error("Invalid update");
    }

    if (!user) {
      res.status(404);
      throw new Error("Not found");
    }

    userBodyField.forEach((field) => (user[field] = req.body[field]));
    try {
      await user.save();

      res.send(user);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to update");
    }
  })
);

// @desc    User Delete
// @route   DELETE /api/users/delete/me
// @access  Private

router.delete(
  "/delete/me",
  auth,
  asyncHandler(async (req, res) => {
    try {
      await User.deleteOne({ _id: req.user.id });
      res.send(req.user);
    } catch (error) {
      throw new Error("Failed to delete.");
    }
  })
);

/************ADMIN ENDPOINTS AREA*********/

// @desc    Get all users (ADMIN)
// @route   GET /api/users/
// @access  Private/Admin

router.get(
  "/",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// @desc    Get user by id (ADMIN)
// @route   GET /api/users/:id
// @access  Private/Admin
router.get(
  "/:id",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.send(user);
    }
    res.status(404);
    throw new Error("Not found");
  })
);

// @desc    Update user (ADMIN)
// @route   Patch /api/users/:id
// @access  Private/Admin

router.patch(
  "/:id",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("Not found");
    }

    const matchedEmailUser = await User.find({ email: req.body.email });
    if (matchedEmailUser.length !== 0) {
      res.status(400);
      return res.send({ message: "Email đã tồn tại." });
    }

    const userBodyField = Object.keys(req.body);
    const userModelField = ["name", "email", "isAdmin"];
    const isValidOperation = userBodyField.every((field) => userModelField.includes(field));

    if (!isValidOperation) {
      res.status(400);
      throw new Error("Invalid update");
    }

    userBodyField.forEach((field) => (user[field] = req.body[field]));
    try {
      await user.save();

      res.send(user);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to fetch.");
    }
  })
);

// @desc    Delete User By Id (ADMIN)
// @route   DELETE /api/users/:id
// @access  Private/Admin

router.delete(
  "/:id",
  auth,
  admin,
  asyncHandler(async (req, res) => {
    // different way: user.move();
    const { deletedCount } = await User.deleteOne({ _id: req.params.id });
    if (deletedCount !== 0) {
      res.send({ message: "User deleted" });
    } else {
      res.status(400);
      res.send({ message: "Failed to delete user" });
    }
  })
);

export default router;
