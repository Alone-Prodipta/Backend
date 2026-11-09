import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./user.model.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/create", async (req, res) => {
  //it is an asynchronous operation,
  /* so we need to use await to wait for the 
    operation to complete before sending the response*/

  const users = await User.create({
    name: "Prodipta Nayeb",
    username: "prodipta",
    email: "pna@gmail.com",
  });
  res.send(users);
});

app.get("/update", async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { username: "prodipta" },
    { 
      name: "Aheri halder" , 
      email: "aheri@gmail.com"
    },
    { new: true },
  );

  res.send(updatedUser);
});

app.get("/read", async(req,res)=>{
    const readusers = await User.find();
    res.send(readusers); 
});

app.get("/delete", async(req,res)=>{
  const deleteUser= await User.findOneAndDelete({username:"prodipta"});
  res.send(deleteUser);
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
