import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');

app.get('/', (req, res) => {
  res.render("index");
});
app.get('/profile/:users',function(req,res){
  const username= req.params.users;
  res.send(`<body style="background-color: black;">
    <h1 style="font-family: algerian; color: white;">welcome ${username}</h1>
  </body>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})