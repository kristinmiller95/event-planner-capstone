//ScheduleView calendar on Dashboard

import React, { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import EventDetailModal from "./EventDetailModal";
import EventFormModal from "./EventFormModal";

function ScheduleView({ events }) {
  // Receive events as prop
  const { deleteEvent, updateEvent } = useContext(EventsContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this event?")) {
      deleteEvent(id);
      setShowDetailModal(false);
    }
  };

  // Filter events
  const todaysEvents = events.filter((event) => event.date === today);
  const upcomingEvents = events
    .filter((event) => event.date > today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="schedule-view">
      <section className="events-container">
        <h3>Today</h3>
        {todaysEvents.length > 0 ? (
          todaysEvents.map((event) => (
            <div
              key={event.id}
              className={`event-card ${event.category?.toLowerCase()}`}
              onClick={() => handleEventClick(event)}
            >
              <div className="event-category-indicator"></div>
              <div className="event-details">
                <span className="event-time">{event.time}</span>
                <span className="event-title">{event.title}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events today</p>
        )}
      </section>

      <section className="events-container">
        <h3>Upcoming</h3>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => {
            const formattedDate = new Date(event.date).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
              }
            );

            return (
              <div
                key={event.id}
                className={`event-card ${event.category?.toLowerCase()}`}
                onClick={() => handleEventClick(event)}
              >
                <div className="event-category-indicator"></div>
                <div className="event-details">
                  <span className="event-date">{formattedDate}</span>
                  {event.time && (
                    <span className="event-time">{event.time}</span>
                  )}
                  <span className="event-title">{event.title}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-events">No upcoming events</p>
        )}
      </section>

      {/* Modals */}
      {showDetailModal && selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setShowDetailModal(false)}
          onEdit={() => {
            setShowDetailModal(false);
            setShowFormModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {showFormModal && (
        <EventFormModal
          event={selectedEvent}
          onSave={(updatedEvent) => {
            updateEvent(updatedEvent);
            setShowFormModal(false);
          }}
          onCancel={() => setShowFormModal(false)}
        />
      )}
    </div>
  );
}

export default ScheduleView;
