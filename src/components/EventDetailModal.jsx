// ===== MODAL FOR VIEWING/EDITING EVENT DETAILS =====

import React from "react";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

function EventDetailModal({ event, onClose, onEdit, onDelete }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{event.title}</h3>
          <div className="modal-actions">
            <button className="icon-btn" onClick={onEdit} aria-label="Edit">
              <FiEdit2 size={18} />
            </button>
            <button
              className="icon-btn danger"
              onClick={() => onDelete(event.id)}
              aria-label="Delete"
            >
              <FiTrash2 size={18} />
            </button>
            <button className="icon-btn" onClick={onClose} aria-label="Close">
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Event details */}
        <div className="event-details">
          <div className="detail-row">
            <span className="detail-label">Date:</span>
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {event.time && (
            <div className="detail-row">
              <span className="detail-label">Time:</span>
              <span>{event.time}</span>
            </div>
          )}

          {event.location && (
            <div className="detail-row">
              <span className="detail-label">Location:</span>
              <span>{event.location}</span>
            </div>
          )}

          {event.description && (
            <div className="detail-row">
              <span className="detail-label">Notes:</span>
              <p className="event-notes">{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailModal;
