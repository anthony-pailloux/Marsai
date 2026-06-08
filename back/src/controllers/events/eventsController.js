import * as eventsService from "../../services/events/events.service.js";

export const createEvent = async (req, res) => {
  try {
    const created = await eventsService.createEventRecord(req.body);
    return res.status(201).json(created);
  } catch (err) {
    console.error("Error creating event", err);
    return res.status(500).json({ message: "Error creating event" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await eventsService.updateEventRecord(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json(updated);
  } catch (err) {
    console.error("Error updating event", err);
    return res.status(500).json({ message: "Error updating event" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await eventsService.deleteEventRecord(id);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("Error deleting event", err);
    return res.status(500).json({ message: "Error deleting event" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await eventsService.getPublishedEvents();
    res.json(events);
  } catch (err) {
    console.error("Error retrieving events", err);
    return res.status(500).json("Error retrieving events");
  }
};

export const GetEventyByID = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventsService.getEventById(id);

    if (!event) {
      return res.status(404).json("Error: Event Not Found");
    }

    return res.json(event);
  } catch (err) {
    console.error("Error retrieving the event", err);
    return res.status(500).json("Error retrieving the event");
  }
};

export const getEventsForAdmin = async (req, res) => {
  try {
    const events = await eventsService.getAdminEvents();
    res.json(events);
  } catch (err) {
    console.error("Error retrieving events", err);
    return res.status(500).json("Error retrieving events");
  }
};

export const patchPublish = async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;
    const updated = await eventsService.publishEvent(id, published);

    if (!updated) {
      return res.status(404).json("Error: Event Not Found");
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error publishing event", err);
    return res.status(500).json({ message: "Error publishing event" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const eventId = Number(req.params.id);
    const result = await eventsService.createEventBooking(eventId, req.body);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(201).json(result.booking);
  } catch (err) {
    console.error("Error creating booking", err);
    return res.status(500).json({ message: "Erreur lors de la réservation" });
  }
};

export const getBookingsForEvent = async (req, res) => {
  try {
    const result = await eventsService.getEventBookings(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Événement introuvable" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error getBookingsForEvent", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
