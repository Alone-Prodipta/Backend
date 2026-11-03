import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import process from "node:process";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
}

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
}

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  fs.readdir(filesDir, (err, file) => {
    res.render('index', {
      files: err ? [] : file
    });
  });
});

app.post('/create', function(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  if (!title) {
    return res.status(400).send('Task title is required');
  }
  
  fs.appendFile(path.join(filesDir, title + '.txt'), req.body.details || '', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating task');
    } else {
      res.redirect('/');
    }
  });
});

app.get('/files/:filename', function(req, res) {
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

app.post('/files/:filename/rename', async (req, res) => {
  const filename = req.params.filename;
  const newTitle = typeof req.body.newTitle === 'string' ? req.body.newTitle.trim() : '';
  if (path.basename(filename) !== filename || path.extname(filename) !== '.txt') {
    return res.status(400).send('Invalid file name');
  }
  if (
    !newTitle ||
    newTitle === '.' ||
    newTitle === '..' ||
    /[<>:"/\\|?*\x00-\x1f]/.test(newTitle) ||
    newTitle.endsWith('.') ||
    /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i.test(newTitle)
  ) {
    return res.status(400).send('Invalid new file name');
  }

  const newFilename = `${newTitle}.txt`;
  const currentPath = path.join(filesDir, filename);
  const newPath = path.join(filesDir, newFilename);
  try {
    await fs.promises.access(currentPath);
    if (filename.toLowerCase() !== newFilename.toLowerCase()) {
      try {
        await fs.promises.access(newPath);
        return res.status(409).send('A file with that name already exists');
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }
    }
    await fs.promises.rename(currentPath, newPath);
    if (req.body.returnTo === 'detail') {
      return res.redirect(`/files/${encodeURIComponent(newFilename)}`);
    }
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(err.code === 'ENOENT' ? 404 : 500).send('Error renaming file');
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
  console.log("Server is running successfully");
});