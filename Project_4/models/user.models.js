import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
});
const User = mongoose.model("User", userSchema);
export default User;