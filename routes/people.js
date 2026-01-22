//routes/people.js
const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');

router.get('/', peopleController.getAllPeople); 

router.get('/:id', peopleController.getPeopleById);

router.post('/', peopleController.createPeople);

router.put('/:id', peopleController.updatePeople);

router.delete('/:id', peopleController.deletePeople);   


module.exports = router;