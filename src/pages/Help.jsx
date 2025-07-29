// ===== HELP SECTION WITH APP USAGE INTRUSTIONS =====

import { useState } from "react";
import "../app.css";

function Help() {
  const [activeTab, setActiveTab] = useState("getting-started");
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const faqData = {
    "getting-started": [
      {
        id: "register",
        question: "How do I register an account?",
        answer:
          "Click 'Register' and provide your name, email, username and password. All fields are required and emails must be valid (e.g., user@example.com).",
      },
      {
        id: "login",
        question: "How do I log in to my account?",
        answer:
          "Use the 'Login' page with your registered credentials. You'll be redirected to your Dashboard after successful authentication.",
      },
    ],
    "managing-events": [
      {
        id: "add-event",
        question: "How do I create a new event?",
        answer:
          "On your Dashboard click the '+ Create' button. Fill in all details including event name, date, time, and location. Click 'Add' to add it to your schedule.",
      },
      {
        id: "edit-event",
        question: "Can I modify or delete existing events?",
        answer:
          "Yes! In your Dashboard, click any event to view details. Use the edit button to make changes or the delete button to remove the event.",
      },
      {
        id: "view-events",
        question: "How can I see all my upcoming events?",
        answer:
          "Your Dashboard automatically displays all scheduled events. Use the calendar views (Month/Week/Schedule) to see events in different formats.",
      },
    ],
    navigation: [
      {
        id: "views",
        question: "What different views does the app offer?",
        answer:
          "The Dashboard shows all events. Use Month/Week/Schedule tabs to toggle between calendar views. The navigation bar provides quick access to all features.",
      },
      {
        id: "mobile",
        question: "Does the app work on mobile devices?",
        answer:
          "Yes! The app is fully responsive and adapts to any screen size. All features work on both desktop and mobile browsers.",
      },
    ],
    other: [
      {
        id: "support",
        question: "How do I contact support?",
        answer: "Email us at support@chronicle.com for additional help.",
      },
    ],
  };

  return (
    <div className="help-page">
      {/* Column 1 - Title */}
      <div className="help-gradient-col">
        <h1 className="help-title">
          Your guide to using
          <br /> <i>Chronicle.</i>
        </h1>
      </div>

      {/* Column 2 - Help */}
      <div className="help-content-col">
        <div className="help-tabs">
          {["Getting Started", "Managing Events", "Navigation", "Other"].map(
            (tab) => {
              const tabId = tab.toLowerCase().replace(" ", "-");
              return (
                <div
                  key={tabId}
                  className={`help-tab ${activeTab === tabId ? "active" : ""}`}
                  onClick={() => setActiveTab(tabId)}
                >
                  {tab}
                </div>
              );
            }
          )}
        </div>

        <div className="accordion">
          {faqData[activeTab].map((item) => (
            <div key={item.id} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleItem(item.id)}
              >
                <h3>{item.question}</h3>
                <span
                  className={`accordion-icon ${
                    openItems[item.id] ? "rotated" : ""
                  }`}
                >
                  +
                </span>
              </div>
              <div
                className={`accordion-content ${
                  openItems[item.id] ? "show" : ""
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help;
