const Event = require("../model/Event");

//Get all events
const getAllEvents = async (req, res) => {
  const events = await Event.find();
  if (!events) {
    return res.status(400).json({ message: "No Events found." });
  }
  res.json(events);
};

//Create a event
const createNewEvent = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Event title is required",
    });
  }
  try {
    const result = await Event.create({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

//Update a event
const updateEvent = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Id number is required." });
  }
  const event = await Event.findOne({ _id: req.body.id }).exec();

  if (!event) {
    return res
      .status(400)
      .json({ message: `Event Id # ${req.body.id} is not found.` });
  }

  if (req.body.title) event.title = req.body.title;
  if (req.body.start) event.start = req.body.start;
  if (req.body.end) event.end = req.body.end;

  const result = await event.save();

  res.json(result);
};

//Delete a event
const deleteEvent = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Event Id number is required." });
  }
  const event = await Event.findOne({ _id: req.body.id }).exec();

  if (!event) {
    return res
      .status(400)
      .json({ message: `Event Id # ${req.body.id} is not found.` });
  }
  const result = await event.deleteOne();

  res.json(result);
};

//Get a event
const getEvent = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Event Id number required." });
  }

  const event = await Event.findOne({ _id: req.params.id }).exec();

  if (!event) {
    return res
      .status(204)
      .json({ message: `Event Id # ${req.params.id} is not found.` });
  }
  res.json(event);
};

module.exports = {
  getAllEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
  getEvent,
};
