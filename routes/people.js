//routes/people.js
const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');
const { peopleValidationRules, validate } = require('../validator');

// Apply validation middleware to POST and PUT routes
router.post('/', peopleValidationRules(), validate, peopleController.createPeople);

router.get('/', peopleController.getAllPeople); 

router.get('/:id', peopleController.getPeopleById);

router.put('/:id', peopleValidationRules(), validate, peopleController.updatePeople);

router.delete('/:id', peopleController.deletePeople);   


module.exports = router;