import express from "express";
import Category from "../models/categoryModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
