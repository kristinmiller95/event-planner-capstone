// ===== MONTHVIEW DISPLAYS EVENTS IN MONTHLY CALENDAR USING REACT CALENDAR =====

import React, { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Calendar.css";
import EventDetailModal from "./EventDetailModal";
import EventFormModal from "./EventFormModal";

function MonthView({ events }) {
  const { deleteEvent, updateEvent } = useContext(EventsContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateStr = event.date.split("T")[0];
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(event);
    return acc;
  }, {});

  // Handle event click
  const handleEventClick = (event, e) => {
    e.stopPropagation();
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

  // Calendar tile content
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    // Format date to match the stored event dates
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    const dayEvents = eventsByDate[dateStr] || [];

    return (
      <div className="day-events">
        {dayEvents.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className={`event-item ${event.category?.toLowerCase()}`}
            onClick={(e) => handleEventClick(event, e)}
            title={`${event.time ? event.time + " " : ""}${event.title}`}
          >
            {event.title}
          </div>
        ))}
        {dayEvents.length > 3 && (
          <div
            className="more-events"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(dayEvents[0]);
              setShowDetailModal(true);
            }}
          >
            +{dayEvents.length - 3} more
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="month-view">
      <div className="calendar-container">
        <Calendar
          tileContent={tileContent}
          className="react-calendar"
          view="month"
        />
      </div>

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

export default MonthView;
