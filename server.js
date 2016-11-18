var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config = {
    user:'banerjeesouvik',
    database:'banerjeesouvik',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
	secret:'jaydenleone',
	//resave:true,
	//saveUninitialized:true,
	cookie:{ maxAge: 1000*60*60*24*7}
}));

var pool=new Pool(config);

function createTemplate(data){
    var finalTemplate=
                    `<!doctype html>
                     <html>
                     <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link rel="stylesheet" type="text/css"
                              href="https://fonts.googleapis.com/css?family=Tangerine|Josefin+Sans">
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
				<li><a href="/#about">About</a></li>
                                <li><a href="#">Contact</a></li>
                		<li style="float:right"><a href="/register">Sign Up</a></li>
                		<li style="float:right"><a href="/signin">Sign In</a></li>
                            </ul>
                        <div class="content">
                        <div class="center">
                        <br>
                        <div class="container">`;
                            
    for(var i=0;i<data.length;i++){
        var temp=data[i];
        var title=temp.title;
        var poet=temp.poet;
        var dop=temp.dop;
        var body=temp.body;
	var usr=temp.username;
        var template= 
                `<div class="poem_title"> ${title} </div>
                 <div class="poem_desc">&#9997; Author: <a href="/poets/${poet}">${poet}</a>, &#128197; Posted On: ${dop.toDateString()}, &#128100; Posted By: <a href='/poem/user/${usr}'>${usr}</a>
		 </div>
                 <pre><div class="poems">${body}</div></pre>
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

function createProfileTemplate(data){
	var user=data.usrnm;
	var id=data.uid;
	var template=
		`<!doctype html>
		 <html>
		    <head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link href="/ui/style.css" rel="stylesheet" />
			<link rel="stylesheet" type="text/css"
			  href="https://fonts.googleapis.com/css?family=Tangerine">
		    </head>
		    <body>
			<header>
			    PoetryMela
			</header>
			<div class="tag-line">
			    Breathe-in Poetry, Breathe-out Experience.
			</div>
			    <ul>
				<li><a href="/profile/mypoem">My Poems</a></li>
				<li><a href="/profile/allpoem">All Poems</a></li>
				<li><a href="#">Add Poem</a></li>
				<li class="dropdown" style="float:right" id="uname"><a href="#" class="drop-btn">${user}</a>
				<div class="dropdown-content">
			           <a href="/profile/logout">Logout</a>
			        </div></li>
			    </ul>
			<br>
			<div class="content">
			<div class="center bold">
				<h3>Add Poem</h3><hr>
				<input class="tpu" type="text" name="name" placeholder="Name of the poem" id="title"><br>
				<input class="tpu" type="text" name="author" placeholder="Name of the poet" id="poet"><br>
				<textarea class="poemadd" placeholder="Enter the poem" id="poem"></textarea><br>
				<input type="hidden" id="uid" value="${id}">
				<input type="submit" value="Add Poem" id="poem_form">
				<hr>
			</div>
			</div>
			<footer>
			Copyright &copy; 2016 Souvik Banerjee
			</footer>
			<script type="text/javascript" src="/ui/profile.js">
			</script>
		    </body>
		</html>`;
	return template;
}

function mypoemTemplate(data,user){
	var finalTemplate=
		`<!doctype html>
		 <html>
		    <head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link href="/ui/style.css" rel="stylesheet" />
			<link rel="stylesheet" type="text/css"
			  href="https://fonts.googleapis.com/css?family=Tangerine|Josefin+Sans">
		    </head>
		    <body>
			<header>
			    PoetryMela
			</header>
			<div class="tag-line">
			    Breathe-in Poetry, Breathe-out Experience.
			</div>
			    <ul>
				<li><a href="/profile/mypoem">My Poems</a></li>
				<li><a href="/profile/allpoem">All Poems</a></li>
				<li><a href="/profile">Add Poem</a></li>
				<li class="dropdown" style="float:right" id="uname"><a href="#" class="drop-btn">${user.usrnm}</a>
				<div class="dropdown-content">
			           <a href="/profile/logout">Logout</a>
			        </div></li>
			    </ul>
			<br>
			<div class="content">
                        <div class="center">
                        <div class="container">`;
                            
    for(var i=0;i<data.length;i++){
        var temp=data[i];
        var title=temp.title;
        var poet=temp.poet;
        var dop=temp.dop;
        var body=temp.body;
        var template= 
                `
                 <div class="poem_title"> ${title} </div>
		 <div class="poem_desc">&#9997; Author: <a href="/poets/${poet}">${poet}</a>, &#128197; Posted On: ${dop.toDateString()}, &#128100; Posted By: <a href='/poem/user/${usr}'>${usr}</a>
		 </div>
                 <pre>${body}</pre>
                 <hr>`;
        finalTemplate=finalTemplate.concat(template);
    }
    var endpart=
                `</div>
		 </div>
		 </div>
		<footer>
		Copyright &copy; 2016 Souvik Banerjee
		</footer>
                 </body>
                 </html>`;
    finalTemplate=finalTemplate.concat(endpart);
    return finalTemplate;
}


function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
    return hashed.toString('hex');
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/poems', function (req, res) {
  pool.query('SELECT title,body,dop,poet,username FROM poem inner join user_login on poem.usr=user_login.id order by dop asc', function(err,result) {
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
  pool.query("SELECT title,body,dop,poet,username FROM poem inner join user_login on poem.usr=user_login.id where poet = $1 order by dop asc",[poetname], function(err,result) {
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

app.get('/poem/user/:username', function (req, res) {
  var uname=req.params.username;
  pool.query("SELECT title,body,dop,poet,username FROM poem inner join user_login on poem.usr=user_login.id where username = $1 order by dop asc",[uname], function(err,result) {
      if(err){
          res.status(500).send(err.toString());
      }
      else if(result.rows.length===0){
          res.status(404).send('No poem has been added by this user');
      }
      else{
          res.send(createTemplate(result.rows));
      }
  });
});

app.post('/adduser', function (req, res) {
  var uname=req.body.username;
  var pswd=req.body.password;
  pswd=hash(pswd,'jaydenleone');
  pool.query('insert into user_login(username,password) values($1,$2)',[uname,pswd], function(err,result) {
      if(err){
          res.status(500).send(err.toString());
      }
      else{
          res.status(200).send('user successfully registered');
      }
  });
});

app.post('/login', function (req, res) {
  var uname=req.body.username;
  var pswd=req.body.password;
  pswd=hash(pswd,'jaydenleone');
  pool.query('select * from user_login where username=$1',[uname], function(err,result) {
      if(err){
          res.status(500).send(err.toString());
      }
      else{
	  if(result.rows.length===0)
	    res.status(403).send('Invalid Username or Password');
	  else{
	    if(result.rows[0].password===pswd){
     	     req.session.auth={uid: result.rows[0].id, usrnm: result.rows[0].username};
	     res.status(200).send('loggin succesfully');
	    }
	    else
 	     res.status(403).send('Invalid Username or Password');
	  }
      }
  });
});


app.post('/addpoem', function (req, res) {
  var title=req.body.ttl;
  var poet=req.body.pt;
  var body=req.body.pm;
  var uid=req.body.usid;
  pool.query('insert into poem(title,poet,body,usr) values($1,$2,$3,$4)',[title,poet,body,parseInt(uid)], function(err,result) {
      if(err){
          res.status(500).send(err.toString());
      }
      else{
          res.status(200).send('Poem added successfully');
      }
  });
});

app.get('/profile', function (req, res) {
  if(req.session && req.session.auth && req.session.auth.uid){
  res.send(createProfileTemplate(req.session.auth));
  }else
  res.redirect('/');  
});

app.get('/profile/mypoem', function (req, res) {
  if(req.session && req.session.auth && req.session.auth.uid){
  pool.query('SELECT title,body,dop,poet,username FROM poem inner join user_login on poem.usr=user_login.id where poem.usr =$1 order by dop asc',[parseInt(req.session.auth.uid)], function(err,result) {
    if(err){
        res.status(500).send(err.toString());
    }
    else
  	res.send(mypoemTemplate(result.rows,req.session.auth));
  });
  }else
  res.redirect('/');  
});

app.get('/profile/allpoem', function (req, res) {
  if(req.session && req.session.auth && req.session.auth.uid){
  pool.query('SELECT title,body,dop,poet,username FROM poem inner join user_login on poem.usr=user_login.id order by dop asc', function(err,result) {
    if(err){
        res.status(500).send(err.toString());
    }
    else
  	res.send(mypoemTemplate(result.rows,req.session.auth));
  });
  }else
  res.redirect('/');  
});

app.get('/profile/logout', function(req,res) {
  delete req.session.auth;
  res.redirect('/');
});

app.get('/signin',function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signin.html'));
});

app.get('/register',function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'register.html'));
});

app.get('/contact',function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'contact.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/firstimage.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'firstimage.jpg'));
});

app.get('/ui/secondimage.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'secondimage.jpg'));
});

app.get('/ui/thirdimage.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'thirdimage.jpg'));
});

app.get('/ui/main.js',function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/signin.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signin.js'));
});

app.get('/ui/signup.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signup.js'));
});

app.get('/ui/profile.js',function(req,res){
  res.sendFile(path.join(__dirname,'ui','profile.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
