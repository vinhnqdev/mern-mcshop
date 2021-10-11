import mongoose from "mongoose";

const brandModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandModel);

export default Brand;
