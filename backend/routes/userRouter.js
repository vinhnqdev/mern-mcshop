import express from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { auth } from "../middleware/authMiddleware.js";
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
      throw new Error(error.message);
    }
  })
);

// @desc    User Signup
// @route   POST /api/users/
// @access  Public
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const user = new User(req.body);
    const token = await user.generateAuthToken();

    try {
      await user.save();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400);
      throw Error("Email existed!!");
    }
  })
);

// @desc    User Profile
// @route   GET /api/users/profile
// @access  Private

router.get(
  "/profile",
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

// @desc    User Update
// @route   PATCH /api/users/update
// @access  Private

router.patch(
  "/update",
  auth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    // Kiểm tra các trường req.body gửi lên có khớp với các trường trong model không?
    const userBodyField = Object.keys(req.body);
    const userModelField = ["name", "email", "password"];

    const isValidOperation = userBodyField.every((field) => userModelField.includes(field));

    if (!isValidOperation) {
      res.status(400);
      throw new Error("Invalid update");
    }

    if (!user) {
      res.status(400);
      throw new Error("Not found");
    }

    userBodyField.forEach((field) => (user[field] = req.body[field]));
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send();
    }
  })
);

// @desc    User Delete
// @route   DELETE /api/users/profile
// @access  Private

router.delete(
  "/profile",
  auth,
  asyncHandler(async (req, res) => {
    try {
      console.log(req.user);
      await User.deleteOne({ _id: req.user.id });
      res.send(req.user);
    } catch (error) {
      throw new Error("Failed to delete.");
    }
  })
);

export default router;
