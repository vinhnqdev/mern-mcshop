import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  // this.tokens = this.tokens.concat({ token });
  // this.tokens = [...this.tokens, { token }];
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.isAdmin;
  // delete userObject.avatar;
  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email don't exist!!");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Error("Password is wrong!!!");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  // Khi update một user, thường có thể sẽ không sửa password
  // Nên trường hợp như thế kiểm tra để không hash mật khẩu
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
