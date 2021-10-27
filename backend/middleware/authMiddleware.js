import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const auth = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    req.user = user;
    req.token = token;
  } else {
    res.status(401);
    throw new Error("Please authentication");
  }
  next();
});

export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

// export const auth = async (req, res, next) => {
//   //   console.log(req.header("Authorization"));
//   try {
//     const token = req.headers.token.replace("Bearer ", "");
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     const user = await User.findOne({
//       _id: decoded._id,
//       "tokens.token": token,
//     });
//     if (!user) {
//       throw new Error();
//     }
//     req.token = token;
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).send({
//       error: "Please authenticate.",
//     });
//   }
// };
