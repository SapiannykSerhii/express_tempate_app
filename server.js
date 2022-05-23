const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();
const multer = require('multer');
const upload = multer();

app.engine('.hbs', hbs.engine());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', upload.single('uploadFile'), (req, res) => {

  const {author, sender, title, message} = req.body
  const uploadFile = req.file

  if (author && sender && title && uploadFile && message) {
    res.render('contact', {isSent: true})
  }
    else {
      res.render('contact', {isError: true})
    }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(1010, () => {
  console.log('Server is running on port: 1010');
});