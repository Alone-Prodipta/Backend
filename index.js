const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
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