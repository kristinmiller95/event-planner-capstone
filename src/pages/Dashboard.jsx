// ===== MAIN PAGE DISPLAYING UPCOMING EVENTS IN SELECTED VIEW =====

import { useState, useContext, useEffect } from "react";
import { EventsContext } from "../context/EventsContext";
import { AuthContext } from "../context/AuthContext";
import ScheduleView from "../components/ScheduleView";
import WeekView from "../components/WeekView";
import MonthView from "../components/MonthView";
import EventFormModal from "../components/EventFormModal";
import { FiMenu, FiX } from "react-icons/fi";
import "../app.css";

function Dashboard() {
  const { events, addEvent } = useContext(EventsContext);
  const [currentView, setCurrentView] = useState("schedule");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    Appointment: true,
    Task: true,
    Event: true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(AuthContext);

  // Check mobile status on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter events based on selected categories
  const filteredEvents = events.filter(
    (event) => selectedCategories[event.category]
  );

  const handleCategoryChange = (category) => {
    setSelectedCategories({
      ...selectedCategories,
      [category]: !selectedCategories[category],
    });
  };

  const handleCreateEvent = (newEvent) => {
    addEvent({
      ...newEvent,
      id: Date.now().toString(),
    });
    setShowCreateModal(false);
  };

  const renderView = () => {
    switch (currentView) {
      case "week":
        return <WeekView events={filteredEvents} />;
      case "month":
        return <MonthView events={filteredEvents} />;
      default:
        return <ScheduleView events={filteredEvents} />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Left Column - controls */}
      <div className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* View Section card */}
        <div className="left-panel-section">
          <h3>View</h3>
          <div className="view-toggle">
            <button
              className={currentView === "schedule" ? "active" : ""}
              onClick={() => {
                setCurrentView("schedule");
                if (isMobile) setSidebarOpen(false);
              }}
            >
              Schedule
            </button>
            <button
              className={currentView === "week" ? "active" : ""}
              onClick={() => {
                setCurrentView("week");
                if (isMobile) setSidebarOpen(false);
              }}
            >
              Week
            </button>
            <button
              className={currentView === "month" ? "active" : ""}
              onClick={() => {
                setCurrentView("month");
                if (isMobile) setSidebarOpen(false);
              }}
            >
              Month
            </button>
          </div>
        </div>

        {/* Category Section card */}
        <div className="left-panel-section">
          <h3>Categories</h3>
          <div className="category-filter">
            {Object.keys(selectedCategories).map((category) => (
              <label
                key={category}
                className={`category-label category-${category.toLowerCase()}`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories[category]}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="category-text">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - main content section */}
      <div className={`dashboard-main ${isMobile ? "mobile" : ""}`}>
        <header className="dashboard-header">
          {/* Welcome text - displays on desktop only */}
          {!isMobile && (
            <h1 className="welcome-text">
              Welcome back, {user?.name || "User"}!
            </h1>
          )}

          {isMobile && <div className="mobile-spacer" />}

          <button
            className="btn btn-primary create-btn"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Event
          </button>
        </header>

        {/* Create Event Modal */}
        {showCreateModal && (
          <EventFormModal
            onSave={handleCreateEvent}
            onCancel={() => setShowCreateModal(false)}
          />
        )}

        {/* Render the current view */}
        {renderView()}
      </div>
    </div>
  );
}

export default Dashboard;
