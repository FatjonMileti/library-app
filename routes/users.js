var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.log(err);
  }
console.log('Connected to SQlite database.');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  var Username = req.cookies.username;
  var Password = req.cookies.password;
  if (Username == 'admin' && Password == 'Holberton') {
    res.render('users');
  } else {
  res.render('login', {message: ''});
  }
});

router.post('/', (req, res) => {
  var Username = req.body.username;
  var Password = req.body.password;

  if (Username == 'admin' && Password == 'Holberton') {
    res.cookie("username", Username);
    res.cookie("password", Password);
    res.render('users');
  } else {
   res.render('login', { message: 'Enter correct username and password'});
  };
});

router.post("/add_book", (req, res) => {

  var book_name = req.body.book_name;
  var cover_image = req.body.cover_image;
  var d_link = req.body.d_link;
  var author_name = req.body.author_name;
  var description = req.body.description;
  var genres = req.body.genres;

var insertQuery ='INSERT INTO books VALUES (' +'"'+ book_name+'"'+ ', '+'" '+ cover_image+ '"'+', '+ '"'+ d_link+ '"'+', '+ '"'+ author_name+ '"'+', '+ '"'+ description+ '"'+', '+ '"'+ genres+ '"'+');'

  db.run(insertQuery , (err) => {
    if(err) {
      console.log(err);
    };
  });
  res.redirect('/users');
});

// update book
router.get('/edit_book', function(req, res, next) {
  res.render('update');
});

router.post("/edit_book", (req, res) => {

  var book_name = req.body.book_name;
  var cover_image = req.body.cover_image;
  var d_link = req.body.d_link;
  var author_name = req.body.author_name;
  var description = req.body.description;
  var genres = req.body.genres;

var editQuery ='UPDATE books SET cover_image = ' +'"'+ cover_image+ '"'+', ' + 'd_link = ' +'"'+ d_link+ '"'+', ' + 'author_name = ' +'"'+ author_name+ '"'+', '+ 'description = ' +'"'+ description+ '"'+', ' + 'genres = ' +'"'+ genres+ '"'+'WHERE '+ 'book_name = ' + '"' + book_name+ '"'+ ";"

  db.run(editQuery , (err) => {
    if(err) {
      console.log(err);
    };
  res.render('update');
  });
});

// delete book
router.get('/delete_book', function(req, res, next) {
  res.render('delete');
});

router.post("/delete_book", (req, res) => {
  var book_name = req.body.book_name;
  
  var deleteQuery ='DELETE FROM books WHERE  book_name = '+'"'+ book_name +'"'+ ';'

    db.run(deleteQuery , (err) => {
    if(err) {
      console.log(err);
    };
      res.render('delete');
  });
});

module.exports = router;
