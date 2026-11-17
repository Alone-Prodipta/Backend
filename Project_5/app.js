import "dotenv/config";
import express from "express";
import User from "./models/user.models.js"
import Post from "./models/posts.models.js"
const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/create",async(req, res)=>{
    const user= await User.create({
        username: "piku",
        age: 80,
        email: "pn@gmail.com"
    });
    res.send(user);
})

app.get("/post/create",async(req, res)=>{
    const post= await Post.create({
        postdata: "Do not think of results just perform your Duty",
          user: "6738a1b2c3d4e5f60718293a",
          
    });
    const users= await User.findOne({_id: "6738a1b2c3d4e5f60718293a"});
    if (!users) {
        return res.status(404).send("User not found");
    }
    users.posts.push(post._id);
    await users.save();
    res.send({post, users});
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})