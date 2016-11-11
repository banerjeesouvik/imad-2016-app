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
    var finalTemplate=
                    `<!doctype html>
                     <html>
                     <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="/ui/style.css" rel="stylesheet" />
                        <title>PoetryMela.com</title>
                     </head>
                     <body>
                    	<header>
                    	    PoetryMela
                    	</header>
                    	<div class="tag-line">
                    	    Breathe-in Poetry, Breathe-out Experience.
                    	</div>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/poems">Poems</a></li>
                                <li><a href="#">Contact</a></li>
                		        <li style="float:right"><a href="/signin">Sign In</a></li>
                            </ul>
                        <div class="content">
                        <div class="center">
                        <br>
                        <div class="container">`;
                            
    for(var i=0;i<data.length;i++){
        var temp=data[i];
        var title=temp.title;
        var poet=temp.poet_name;
        var dop=temp.dop;
        var body=temp.body;
        var template= 
                `
                 <h2> ${title} </h2>
                 <h3> Author: <a href="/poets/${poet}">${poet}</a> , Posted On: ${dop.toDateString()} </h3>
                 <br>
                 <pre> <div class="poems">${body}</div></pre>
                 <hr>`;
        finalTemplate=finalTemplate.concat(template);
    }
    var endpart=
                `</div>
                 </div>
                 </div>
                 <footer>
                    &copy; Souvik Banerjee
                 </footer>
                 </body>
                 </html>`;
    finalTemplate=finalTemplate.concat(endpart);
    return finalTemplate;
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

app.get('/poems', function (req, res) {
  pool.query('SELECT title,body,dop,poet_name FROM poems inner join poet on poems.poet_id=poet.poet_id order by dop asc', function(err,result) {
      if(err){
          res.status(500).send(err.toString());
      }
      else{
          res.send(createTemplate(result.rows));
      }
  });
});

app.get('/poets/:poetname', function (req, res) {
  var poetname=req.params.poetname;
  pool.query("SELECT title,body,dop,poet_name FROM poems inner join poet on poems.poet_id=poet.poet_id where poet_name = $1 order by dop asc",[poetname], function(err,result) {
      if(err){
          res.status(500).send(err.toString());
      }
      else if(result.rows.length===0){
          res.status(404).send('No poem found of this poet');
      }
      else{
          res.send(createTemplate(result.rows));
      }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/signin',function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signin.html'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
