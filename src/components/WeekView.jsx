// ===== WEEKVIEW DISPLAYS EVENTS IN WEEKLY CALENDAR FORMAT USING REACT CALENDAR =====

import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Calendar.css";
import { EventsContext } from "../context/EventsContext";
import EventDetailModal from "./EventDetailModal";
import EventFormModal from "./EventFormModal";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";

function WeekView({ events }) {
  // Receive filtered events as prop
  const { deleteEvent, updateEvent } = useContext(EventsContext);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  // Get start/end of week
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Filter events for current week
  const weekEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= startOfWeek && eventDate <= endOfWeek;
  });

  // Group events by day
  const eventsByDay = Array(7)
    .fill()
    .map((_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dateStr = day.toISOString().split("T")[0];
      return {
        date: day,
        events: weekEvents.filter((e) => e.date === dateStr),
      };
    });

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

  // Weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="week-view">
      <div className="calendar-navigation">
        <h3 className="week-view-title">
          {startOfWeek.toLocaleDateString("en-UK", {
            month: "short",
            day: "numeric",
          })}{" "}
          -
          {endOfWeek.toLocaleDateString("en-UK", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </h3>
        <div className="week-nav-buttons">
          <button
            className="btn btn-outline"
            onClick={() => setDate(new Date(date.setDate(date.getDate() - 7)))}
          >
            Previous
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setDate(new Date())}
          >
            Today
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setDate(new Date(date.setDate(date.getDate() + 7)))}
          >
            Next
          </button>
        </div>
      </div>

      <div className="week-grid">
        {eventsByDay.map((day, i) => (
          <div
            key={i}
            className={`day-column ${
              day.date.toDateString() === new Date().toDateString()
                ? "current-day"
                : ""
            }`}
          >
            <div className="day-header">
              <div className="weekday">{weekdays[i].substring(0, 3)}</div>
              <div className="date">{day.date.getDate()}</div>
            </div>
            <div className="day-events">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className={`event-item ${event.category?.toLowerCase()}`}
                  onClick={() => handleEventClick(event)}
                >
                  <span className="event-time">{event.time}</span>
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
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

export default WeekView;
