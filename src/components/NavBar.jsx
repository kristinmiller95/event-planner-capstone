// ===== FIXED NAVIGATION HEADER WITH LINKS TO APPLICATION SECTIONS =====

import { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/logo1.png";
import { FiMenu, FiX } from "react-icons/fi";
import "../app.css";

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false); // Close mobile menu after logout
  };

  const isDashboard = pathname === "/dashboard";

  return (
    <nav className="navbar-horizontal">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          <img src={Logo} alt="Event Planner" width="40" height="40" />
        </NavLink>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop navigation - wraps existing navbar-right */}
        <div className="desktop-nav-items">
          <div className="navbar-right">
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className="nav-item"
                aria-current={isDashboard ? "page" : undefined}
              >
                My Planner
              </NavLink>
            )}
            <NavLink
              to="/help"
              className="nav-item"
              aria-current={pathname === "/help" ? "page" : undefined}
            >
              Helpful Resources
            </NavLink>
            {isAuthenticated && (
              <button onClick={handleLogout} className="logout-btn">
                Log out
              </button>
            )}
          </div>
        </div>

        {/* Mobile navigation - same items with auth checks */}
        <div className={`mobile-nav-items ${mobileMenuOpen ? "open" : ""}`}>
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className="nav-item"
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isDashboard ? "page" : undefined}
            >
              My Planner
            </NavLink>
          )}
          <NavLink
            to="/help"
            className="nav-item"
            onClick={() => setMobileMenuOpen(false)}
            aria-current={pathname === "/help" ? "page" : undefined}
          >
            Helpful Resources
          </NavLink>
          {isAuthenticated && (
            <button onClick={handleLogout} className="logout-btn">
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
