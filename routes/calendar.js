//routes/calendar.js

const express = require('express');
const router = express.Router();

const calendarController = require('../controllers/calendar');
const { calendarValidationRules, validate } = require('../middleware/validator');

const { isAuthenticated } = require('../middleware/authenticate');

// public routes do not require authentication
router.get('/', calendarController.getAllCalendar); 
router.get('/:id', calendarController.getCalendarById);


// Apply validation and authentication middleware to POST and PUT routes
router.post('/', isAuthenticated,  calendarValidationRules(), validate, calendarController.createCalendar);
router.put('/:id', isAuthenticated, calendarValidationRules(), validate, calendarController.updateCalendar);
router.delete('/:id', isAuthenticated, calendarController.deleteCalendar);   


module.exports = router;