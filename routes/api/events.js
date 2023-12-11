const express = require('express');
const router = express.Router();
const eventsController = require('../../controllers/eventController');


router.route('/')
    .get(eventsController.getAllEvents)
    .post(eventsController.createNewEvent)
    .put(eventsController.updateEvent)
    .delete(eventsController.deleteEvent);



router.route('/:id')
    .get(eventsController.getEvent);

module.exports = router;