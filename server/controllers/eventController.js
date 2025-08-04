const Event = require('../models/EventModel');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event', details: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6; 

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      Event.find().sort({ eventDate: 1 }).skip(skip).limit(limit),
      Event.countDocuments()
    ]);

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};
