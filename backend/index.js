import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db/mongoose.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import ProductRouter from "./routes/productRouter.js";
import CategoryRouter from "./routes/categoryRouter.js";
import BrandRouter from "./routes/brandRouter.js";
import UserRouter from "./routes/userRouter.js";
import OrderRouter from "./routes/orderRouter.js";
import ShippingAddressRouter from "./routes/shippingAddressRouter.js";
import UploadRouter from "./routes/uploadRouter.js";
import chalk from "chalk";
const app = express();
const PORT = process.env.port || 5000;

dotenv.config();
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

//Routers
app.use("/api/products", ProductRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/brands", BrandRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/addresses", ShippingAddressRouter);
app.use("/api/upload", UploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Custom Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    chalk.blue.underline.bold(`Server is running in ${process.env.NODE_ENV} mode at port ${PORT}`)
  );
});
