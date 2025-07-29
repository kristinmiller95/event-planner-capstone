// ===== SAMPLE DATA FOR DEVELOPEMENT AND TESTING =====

export const mockEvents = [
  {
    id: "1",
    title: "Team Meeting",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    category: "Event",
    location: "Zoom",
  },
  {
    id: "2",
    title: "Dentist Appointment",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "09:30",
    category: "Appointment",
    location: "Main St Dental",
  },
  {
    id: "3",
    title: "Project Deadline",
    date: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
    category: "Task",
  },
  {
    id: "4",
    title: "Lunch with Client",
    date: new Date().toISOString().split("T")[0],
    time: "12:00",
    category: "Event",
    location: "Downtown Cafe",
  },
  {
    id: "5",
    title: "Code Review",
    date: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
    time: "15:00",
    category: "Task",
  },
  {
    id: "6",
    title: "Doctor's Appointment",
    date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    time: "10:15",
    category: "Appointment",
    location: "Health Center",
  },
];
