//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
 
//Create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'crud_db'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');

  //conn.query("SELECT * FROM user ORDER BY product_id DESC", function (err, result) {
    //if (err) throw err;
    //console.log(result);
  //});
}); 
 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));
 
//route for homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM user";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('user_view',{
      results: results
    });
  });
});
 
//route for insert data
app.post('/save',(req, res) => {
  let data = {benutzer_name: req.body.benutzer_name, vor_name: req.body.vor_name,
              nach_name: req.body.nach_name, passwort: req.body.passwort,
              email: req.body.email, rolle: req.body.rolle};
  let sql = "INSERT INTO user SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE user SET benutzer_name='"+req.body.benutzer_name+"', vor_name='"+req.body.vor_name+"', nach_name='"+req.body.nach_name+"', passwort='"+req.body.passwort+"', email='"+req.body.email+"', rolle='"+req.body.rolle+"' WHERE product_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for sorting
app.post('/sort',(req, res) => {
  conn.query("SELECT * FROM user ORDER BY product_id DESC", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM user WHERE product_id="+req.body.product_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
 
//server listening
app.listen(8001, () => {
  console.log('Server is running at port 8000');
});