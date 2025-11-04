// controllers/eventController.js
import Event from "../models/eventModel.js";


export const createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;

    if (!title || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      startTime,
      endTime,
      user: req.user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort({ startTime: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
