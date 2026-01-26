//routes/index.js
const router = require('express').Router();
const passport = require('passport');

// router.get('/', (req, res) => {
//   res.send('Family Calendar API is running. Use /calendar to view all events, use /people to view all people!');
// });

router.use('/people', require('./people'));
router.use('/calendar', require('./calendar'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
  res.redirect('/');
  });
});

module.exports = router;