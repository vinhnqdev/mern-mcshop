import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/mongoose.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import ProductRouter from "./routes/productRouter.js";
import CategoryRouter from "./routes/categoryRouter.js";
import BrandRouter from "./routes/brandRouter.js";

import chalk from "chalk";
const app = express();
const PORT = process.env.port || 5000;

dotenv.config();
connectDB();

app.use(express.json());

//Routers
app.use("/api/products", ProductRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/brands", BrandRouter);

// Custom Middleware
app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    chalk.blue.underline.bold(`Server is running in ${process.env.NODE_ENV} mode at port ${PORT}`)
  );
});
