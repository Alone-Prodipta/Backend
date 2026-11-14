import express from "express";
import dotenv from "dotenv";
import path from "path";
import process from "node:process";
import { fileURLToPath } from "url";
import User from "./models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await User.create({
        username,
        email,
        password: hash,
        age,
      });
      const jwt= jwt.sign({email},"secret");
      res.cookie("token",token);
      res.send({
        username: user.username,
        email: user.email,
        password: user.password,
        age: user.age,
      });
    });
  });
});

app.post("/logout",(req,res)=>{
res.cookie("token","");
})

app.get("/login",(req,res)=>{
  res.render("login");
})
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
