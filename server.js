// project2 server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  }))
    // This is the basic express session ({..}) initialization
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  // allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key Authorization"
    )
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    )
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }));

app.use('/', require('./routes'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Logged in as ${req.user.username}`);

  } else {
    res.send("Logged Out<br><br>Family Calendar API is running. Use /calendar to view all events, use /people to view all people!");
  }
});
app.get('/github/callback', passport.authenticate('github', { 
  failureRedirect: '/api-docs'}), 
  (req, res) => {
    //req.session.user = req.user;
    res.redirect('/');
  });

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    //});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



  

// Removed duplicate app.use() calls


//app.use('/', require('./routes'));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
  if (err) {
    console.log('Unable to connect to database', err);
  } 
  else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`)
    });
  }
});


module.exports = mongodb;

module.exports = app;