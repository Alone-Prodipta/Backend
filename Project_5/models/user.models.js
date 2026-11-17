import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI);
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post"
  },
  age: Number
});
const User= mongoose.model("User",userSchema);
export default User;
