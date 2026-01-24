//project2 controllers/calendar.js

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCalendar = async (req, res) => {
    try {
    const result = await mongodb.getDatabase().db().collection('calendar').find();
    result.toArray().then((calendar) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(calendar);
    });
} catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching calendar events.' });
}};

const getCalendarById = async (req, res) => {
    try {
    const calendarID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('calendar').find({_id: calendarID});
    result.toArray().then((calendar) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(calendar[0]);
    });
} catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the calendar event by id.' });
}};

const createCalendar = async (req, res) => {
    try {
    const calendar = {
        eventTitle: req.body.eventTitle,
        eventDate: req.body.eventDate.split('T')[0],
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        eventDescription: req.body.eventDescription || '',
        eventLocation: req.body.eventLocation || '',
        person: req.body.person
    };
    const response = await mongodb.getDatabase().db().collection('calendar').insertOne(calendar);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating calendar.');
    }
} catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the calendar event.' });

}};

const updateCalendar = async (req, res) => {
    try {
    const calendarID = new ObjectId(req.params.id);
    const calendar = {
        eventTitle: req.body.eventTitle,
        eventDate: req.body.eventDate ? req.body.eventDate.split('T')[0] : undefined,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        eventDescription: req.body.eventDescription || '',
        eventLocation: req.body.eventLocation || '',
        person: req.body.person
    };
    const response = await mongodb.getDatabase().db().collection('calendar').replaceOne({_id: calendarID}, calendar);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating calendar by id.');
    }
} catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the calendar event.' });

}};

const deleteCalendar = async (req, res) => { 
    try {
    const calendarID = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('calendar').deleteOne({_id: calendarID});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting calendar.');
    }
} catch (error) {   
    res.status(500).json({ error: 'An error occurred while deleting the calendar event.' });
}};

module.exports = {
    getAllCalendar,
    getCalendarById,
    createCalendar,
    updateCalendar,
    deleteCalendar
};