//routes/people.js
const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');
const { peopleValidationRules, validate } = require('../middleware/validator');

const { isAuthenticated } = require('../middleware/authenticate');

// public routes do not require authentication
router.get('/', peopleController.getAllPeople); 
router.get('/:id', peopleController.getPeopleById);

// Apply validation and authentication middleware to POST and PUT routes
router.post('/', isAuthenticated, peopleValidationRules(), validate, peopleController.createPeople);
router.put('/:id', isAuthenticated, peopleValidationRules(), validate, peopleController.updatePeople);
router.delete('/:id', isAuthenticated, peopleController.deletePeople);   


module.exports = router;