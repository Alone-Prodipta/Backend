import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URI);
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  image_url: String
});

const User = mongoose.model("User", userSchema);
export default User;