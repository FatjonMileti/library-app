var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.log(err);
  }
});

var selectQuery = 'SELECT * FROM books ORDER BY book_name asc;'

/* GET home page. */
router.get('/', function(req, res, next) {
  db.all(selectQuery , (err , data) => {
  if(err) return;
 // console.log(data);
    
  res.render('index', { books: data });
});
});

/* Search */

var searchQuery = 'SELECT * FROM books;'

router.post('/', (req, res, next) => {
  const filters = req.body.search;
  
  db.all(searchQuery , (err , data) => {
    if(err) return;
    function result(e) {
      if (e.book_name.toLowerCase().includes(filters.toLowerCase())) {
        return e;
        }
      }
    var filtered = data.filter(result);
    // console.log(filtered);
    res.render('index', { books: filtered });
    });
  });

module.exports = router;
