// middleware/validator.js
const { body, validationResult } = require('express-validator')

const calendarValidationRules = () => {
  return [

    body('eventTitle')
        .trim()
        .notEmpty().withMessage('Event title is required')
        .isLength({ max: 100 }).withMessage('Event title cannot exceed 100 characters'),

    body('eventDate')
        .notEmpty().withMessage('Event date is required')
        .isISO8601().withMessage('Event date must be a valid date in 2026-01-31 format'),

    body('startTime')
        .notEmpty().withMessage('Start time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Start time must be in HH:MM 24-hour format'),

    body('endTime')
        .notEmpty().withMessage('End time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('End time must be in HH:MM 24-hour format'),

    body('eventDescription').optional().isLength({ max: 500 }).withMessage('Event description cannot exceed 500 characters'),
    body('eventLocation').optional().isLength({ max: 200 }).withMessage('Event location cannot exceed 200 characters')  ,
    body('person').notEmpty().withMessage('Person is required')
  ]
}


const peopleValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required').isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
    body('lastName').notEmpty().withMessage('Last name is required').isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
    body('displayName').notEmpty().withMessage('Display name is required').isLength({ max: 50 }).withMessage('Display name cannot exceed 50 characters'),
    body('role').notEmpty().withMessage('Role is required').isIn(['parent', 'child', 'other']).withMessage('Role must be one of parent, child, or other'),
    body('displayColor').optional().isHexColor().withMessage('Display color must be a valid hex color code'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    success:false,
    errors: extractedErrors,
  })
}

module.exports = {
  calendarValidationRules,
  validate,
  peopleValidationRules
}