import mongoose from "mongoose";
import chalk from "chalk";
const connectBD = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/mc-shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log(chalk.blue.underline.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(chalk.red.underline.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectBD;
