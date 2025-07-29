// ===== EVENTSCONTEXT CENTRALISES EVENT DATA AND CRUD OPERATIONS =====

import { createContext, useState, useEffect } from "react";
import { mockEvents } from "../data/mockData";

export const EventsContext = createContext();

function EventsProvider({ children }) {
  // Initialize state from localStorage or use mock data if none exists
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem("events");
      return savedEvents ? JSON.parse(savedEvents) : mockEvents;
    } catch (error) {
      console.error("Failed to parse saved events", error);
      return mockEvents;
    }
  });

  // Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const updateEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <EventsContext.Provider
      value={{ events, addEvent, deleteEvent, updateEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export default EventsProvider;
