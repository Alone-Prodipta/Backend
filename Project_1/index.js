import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');

app.get('/', (req, res) => {
  const taskDir = path.join(__dirname, 'files');

  fs.readdir(taskDir, (err, file) => {
    res.render('index', {
      files: err ? [] : file
    });
  });
  
});
app.post('/create',function(req,res){
  fs.writeFile(path.join(__dirname, 'files', req.body.title + '.txt'), req.body.details, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating task');
    } else {
      res.redirect('/');
    }
  });
});

app.get('/files/:filename',function(req, res){
  const filePath = path.join(__dirname, 'files', req.params.filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    } else {
      res.send(`<body style="background-color: #1a202c;">
        <h1 style="font-family: algerian; color: white;">${req.params.filename}</h1>
        <textarea style="color: white; 
        background-color: #2d3748; border: none; padding: 10px; width: 100%; height: 100%; font-size: 16px;">${data}</textarea>
      </body>`);
    }
  });
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})