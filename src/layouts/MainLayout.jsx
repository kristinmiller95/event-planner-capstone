// ===== WRAPPER LAYOUT FOR CONSISTENT UI STRUCTURE =====

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
