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
const filesDir = path.join(__dirname, 'files');
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine','ejs');

app.get('/', (req, res) => {
  fs.readdir(filesDir, (err, file) => {
    res.render('index', {
      files: err ? [] : file
    });
  });
  
});
app.post('/create',function(req,res){
  fs.appendFile(path.join(__dirname, 'files', req.body.title + '.txt'), req.body.details, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating task');
    } else {
      res.redirect('/');
    }
  });
});

app.get('/files/:filename',function(req, res){
  const filename = req.params.filename;
  if (path.basename(filename) !== filename || path.extname(filename) !== '.txt') {
    return res.status(400).send('Invalid file name');
  }

  const filePath = path.join(filesDir, filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    } else {
      res.render('file', {
        filename,
        content: data,
        saved: req.query.saved === '1'
      });
    }
  });
});

app.post('/files/:filename', async (req, res) => {
  const filename = req.params.filename;
  if (path.basename(filename) !== filename || path.extname(filename) !== '.txt') {
    return res.status(400).send('Invalid file name');
  }
  if (typeof req.body.content !== 'string') {
    return res.status(400).send('Missing file content');
  }

  try {
    const fileHandle = await fs.promises.open(path.join(filesDir, filename), 'r+');
    try {
      await fileHandle.truncate(0);
      await fileHandle.writeFile(req.body.content, 'utf8');
    } finally {
      await fileHandle.close();
    }
    res.redirect(`/files/${encodeURIComponent(filename)}?saved=1`);
  } catch (err) {
    console.error(err);
    res.status(err.code === 'ENOENT' ? 404 : 500).send('Error saving file');
  }
});

app.post('/files/:filename/delete', async (req, res) => {
  const filename = req.params.filename;
  if (path.basename(filename) !== filename || path.extname(filename) !== '.txt') {
    return res.status(400).send('Invalid file name');
  }

  try {
    await fs.promises.unlink(path.join(filesDir, filename));
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(err.code === 'ENOENT' ? 404 : 500).send('Error deleting task');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})