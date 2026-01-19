//routes/index.js
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Family Calendar API is running. Use /calendar to view all events, use /people to view all people!');
});

router.use('/people', require('./people'));
router.use('/calendar', require('./calendar'));

module.exports = router;