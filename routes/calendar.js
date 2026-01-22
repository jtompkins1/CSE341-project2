//routes/calendar.js

const express = require('express');
const router = express.Router();

const calendarController = require('../controllers/calendar');

router.get('/', calendarController.getAllCalendar); 

router.get('/:id', calendarController.getCalendarById);

router.post('/', calendarController.createCalendar);

router.put('/:id', calendarController.updateCalendar);

router.delete('/:id', calendarController.deleteCalendar);   


module.exports = router;