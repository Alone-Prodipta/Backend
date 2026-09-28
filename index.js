const express = require('express');
const app = express();
const port = 3000;
app.use(function(req,res,next){
  next();
});
app.set("view engine","ejs");
app.get('/', function(req, res) {
  res.render("index");
});
app.get('/hello',(req, res)=>{
    res.send("<h1>Prodipta</h1>");
});
app.get('/maniktala',(req, res)=>{
    res.send("<h1>I love kolkata</h1>");
});
app.listen(port, () => {
  console.log(`running on port ${port}`);
})