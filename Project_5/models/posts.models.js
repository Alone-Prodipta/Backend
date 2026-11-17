import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
const postSchema = new mongoose.Schema({
  postdata: String,
  user:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User"
  },
  posts: Array,
  date: {
    type: Date,
    default: Date.now
  }
});
const Post= mongoose.model("Post",postSchema);
export default Post;
