//project2 controllers/calendar.js

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCalendar = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('calendar').find();
    result.toArray().then((calendar) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(calendar);
    });
};

const getCalendarById = async (req, res) => {
    const calendarID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('calendar').find({_id: calendarID});
    result.toArray().then((calendar) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(calendar[0]);
    });
};

const createCalendar = async (req, res) => {
    const calendar = {
        eventTitle: req.body.eventTitle,
        eventDate: req.body.eventDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        eventDescription: req.body.eventDescription,
        eventLocation: req.body.eventLocation,
        person: req.body.person
    };
    const response = await mongodb.getDatabase().db().collection('calendar').insertOne(calendar);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating calendar.');
    }

};

const updateCalendar = async (req, res) => {
    const calendarID = new ObjectId(req.params.id);
    const calendar = {
        eventTitle: req.body.eventTitle,
        eventDate: req.body.eventDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        eventDescription: req.body.eventDescription,
        eventLocation: req.body.eventLocation,
        person: req.body.person
    };
    const response = await mongodb.getDatabase().db().collection('calendar').replaceOne({_id: calendarID}, calendar);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating calendar by id.');
    }

};

const deleteCalendar = async (req, res) => { 
    const calendarID = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('calendar').deleteOne({_id: calendarID});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting calendar.');
    }
};

module.exports = {
    getAllCalendar,
    getCalendarById,
    createCalendar,
    updateCalendar,
    deleteCalendar
};