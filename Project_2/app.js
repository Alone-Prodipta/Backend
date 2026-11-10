import express from "express";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import path from "path";
import process from "node:process";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  const { username, email, image_url } = req.body;
  await User.create({ username, email, image_url });
  res.redirect("/read");
});

app.get("/edit/:_id", async (req, res) => {
  const updatedUser = await User.findById(req.params._id);

  if (!updatedUser) {
    return res.redirect("/read");
  }

  res.render("edit", { updatedUser });
});

app.post("/edit/:_id", async (req, res) => {
  const { username, email, image_url } = req.body;

  await User.findByIdAndUpdate(req.params._id, {
    username,
    email,
    image_url,
  });

  res.redirect("/read");
});

app.get("/read", async (req, res) => {
  const users = await User.find();
  res.render("read", { users });
});

app.get("/delete/:id", async (req, res) => {
  const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
