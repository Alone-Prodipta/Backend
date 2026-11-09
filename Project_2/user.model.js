import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URI);
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String
});

const User = mongoose.model("User", userSchema);
export default User;