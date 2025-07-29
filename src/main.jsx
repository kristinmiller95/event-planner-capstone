import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRouter";
import EventsProvider from "./context/EventsContext";
import AuthProvider from "./context/AuthContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </AuthProvider>
  </StrictMode>
);
