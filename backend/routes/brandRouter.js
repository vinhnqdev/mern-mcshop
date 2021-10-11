import express from "express";
import Brand from "../models/brandModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.send(brand);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
