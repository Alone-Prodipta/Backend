import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.get("/", (req, res) => {
  bycrypt.genSalt(10, function (err, salt) {
    bycrypt.hash("blablablabla", salt, function (err, hash) {
      console.log(hash);
      //store the hash in your password DB.

      bycrypt.compare("blablablabla", hash, function (err, result) {
        console.log(result);

        //importing jwt
        let token = jwt.sign({ email: "pn@gamil.com" }, "secret");
        //res.cookie("token:", token);
        //res.send("done");
        console.log(token);
      });
    });
  });
  res.cookie("name", "piku");
  res.send("done");
});

app.get("/read", (req, res) => {
  console.log(req.cookies);
  res.send("reading done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
