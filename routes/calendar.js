//routes/calendar.js

const express = require('express');
const router = express.Router();

const calendarController = require('../controllers/calendar');
const { calendarValidationRules, validate } = require('../validator');

// Apply validation middleware to POST and PUT routes
router.post('/', calendarValidationRules(), validate, calendarController.createCalendar);

router.get('/', calendarController.getAllCalendar); 

router.get('/:id', calendarController.getCalendarById);

router.put('/:id', calendarValidationRules(), validate, calendarController.updateCalendar);

router.delete('/:id', calendarController.deleteCalendar);   


module.exports = router;