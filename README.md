# Chronicle Event Planner - Hyperion Capstone Project Level 2

A React-based personal event organizer with user authentication and different calender views. Built with React, Vite and Context API.

## Features
- **Multiple views**: Schedule, Week, and Month calendar displays
- **Event management**: Add, edit, or delete events with details
- **Event categorization**: Classify as event, task, or appointment
- **Fully responsive**: Works on desktop and mobile
- **State management**: Context API for shared state
- **User authentication**: Register/login with validation

## Main project structure
src/
├── assets/ # Static assets
├── components/ # Reusable components (MonthView, EventsFormModal, etc.)
├── context/ # Auth and Events contexts
├── data/ # Mock data for development
├── pages/ # Web app pages/screens
├── routes/ # Application routing logic
├── App.css # Component styles
├── Calendar.css # Calendar-specific styles
├── index.css # Global base styles
└── main.jsx # Entry point

## Technologies used
- React
- Vite
- CSS Modules
- Context API
- React Router

## Installation
```bash
# Clone the repository
git clone https://github.com/kristinmiller95/event-planner-capstone.git

# Navigate to project directory
cd event-planner-capstone

# Install dependencies
npm install

# Start development server
npm run dev
```

Open in browser: http://localhost:5173
