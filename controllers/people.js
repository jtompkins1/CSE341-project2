//controllers/people.js

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPeople = async (req, res) => {
    try {
    const result = await mongodb.getDatabase().db().collection('people').find();
    result.toArray().then((people) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(people);
    })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching people.' });
    }
};

const getPeopleById = async (req, res) => {
    try {
    const peopleID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('people').find({_id: peopleID});
    result.toArray().then((people) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(people[0]);
    })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the person by id.' });
    }
};

const createPeople = async (req, res) => {
    try {
    const people = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.displayName,
        role: req.body.role,
        displayColor: req.body.displayColor,
    };
    const response = await mongodb.getDatabase().db().collection('people').insertOne(people);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating people.');
    }
} catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the person.' });

}};

const updatePeople = async (req, res) => {
    try {
    const peopleID = new ObjectId(req.params.id);
    const people = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.displayName,
        role: req.body.role,
        displayColor: req.body.displayColor,
    };
    const response = await mongodb.getDatabase().db().collection('people').replaceOne({_id: peopleID}, people);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating people by id.');
    }
} catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the person.' });

}};

const deletePeople = async (req, res) => { 
    try {
    const peopleID = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('people').deleteOne({_id: peopleID});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting people.');
    }
} catch (error) {   
    res.status(500).json({ error: 'An error occurred while deleting the person.' });
}};

module.exports = {
    getAllPeople,
    getPeopleById,
    createPeople,
    updatePeople,
    deletePeople
};