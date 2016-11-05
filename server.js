var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'banerjeesouvik',
    database:'banerjeesouvik',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));

function createTemplate(data){
    //console.log(data.length);
    //var finalTemplate="<body>";
    //for(var i=0;i<data.lenght;i++){
    var title=data.title;
    var poet=data.poet;
    var dop=data.dop;
    var body=data.body;
    var template= 
                `<html>
                 <h2> ${title} <h2>
                 <h3> Author: ${poet} , Posted On: ${dop} <h3>
                 <br>
                 <pre> ${body} <pre>
                 <hr>
                 </html>`;
    //finalTemplate=finalTemplate.concat(template);
    //}
    return template;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);

app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM poems', function(err,result) {
      if(err){
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result.rows));
      }
  });
});

app.get('/test-db2', function (req, res) {
  pool.query('SELECT * FROM poems', function(err,result) {
      if(err){
          res.status(500).send(err.toString());
      }
      else{
          //console.log(5+6);
          res.send(createTemplate(result.rows[0]));
      }
  });
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/poems',function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'poems.html'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
