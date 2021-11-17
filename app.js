require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const axios = require("axios");
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var cookieParser = require('cookie-parser')

require('./google');
require('./facebook');
require('./twitter');

const con = mysql.createConnection
(
  {
    host:     'localhost',
    user:     'root',
    password: process.env.DB_PASSWORD,
    database: 'itl'
  }
);

const app = express();

app.use(cookieParser())
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));

app.use(session({ secret: process.env.SECRET_FOR_SESSION, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/news',
  passport.authenticate( 'google', {
    successRedirect: '/news',
    failureRedirect: '/'
  })
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/news',
  passport.authenticate('facebook', { successRedirect: '/news',failureRedirect: '/' })
);

app.get('/auth/twitter',passport.authenticate('twitter'));

app.get('/auth/twitter/news', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/news');
  });

app.get('/news', (req, res) => {
    
    let token = req.cookies['x-access-token'];
  
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    

    if (req.isAuthenticated() || (token!==null && token!==undefined && token!=="")){
        axios.get('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=362ed4cc63df44ad9b2e7d1b8fd9b505')
        .then(function (response) {
            res.render("news",{newsArticles:response.data.articles});
        })
        .catch(function (error) {
            res.render("news",{newsArticles:response.data.articles});
        })
    }else{
      res.redirect("/");
    }

});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/login",async function(req,res){
  
    const email = req.body.email;
    const password = req.body.password;

    const q = `select * from users where email = '${email}';`;

    con.query(q,(err,results) => {
        if(err){
            res.redirect("/login");
        }else{
            if(results.length!==0){
                bcrypt.compare(password, results[0].password, function(err, result) {  
                    if(result===true){
                        const token = jwt.sign(
                            {
                                email:email
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: 60000
                            }
                        )
                        let options = {
                          path:"/news",
                          sameSite:true,
                          maxAge: 60000, // would expire after 1 minuite
                          httpOnly: true, // The cookie only accessible by the web server
                        }
                  
                        res.cookie('x-access-token',token, options) 
                        res.redirect("/news");
                    }else{
                      res.redirect("/login");
                    }
                });
            }
            else
            {
              res.redirect("/login");
            }
        }
    })

})

app.post("/register",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
  
    const q = `select * from users where email = '${email}';`;

    con.query(q,(err,results) => {
        if(err){
            res.redirect("/register");
        }else{
            if(results.length>0){
              res.redirect("/register");
            }
            else
            {
                bcrypt.hash(password,2,(err,hash) => {
                    const q2 = `insert into users (email,password) values ('${email}','${hash}');`
                    con.query(q2,(err,results1) => {
                        if(err){
                          res.redirect("/register");
                        }else{
                            if(results1.affectedRows>0){
                              const token = jwt.sign(
                                {
                                    email:email
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn:'1h'
                                }
                              )
                              let options = {
                                path:"/news",
                                sameSite:true,
                                maxAge: 60000, // would expire after 1 minuite
                                httpOnly: true, // The cookie only accessible by the web server
                              }
                        
                              res.cookie('x-access-token',token, options) 
                              res.redirect("/news")
                            }
                            else
                            {
                              res.redirect("/register");
                            }
                        }
                    })
                })       
            }
        }
    })    
})

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});


app.listen(3000, () => console.log('listening on port: 3000'));