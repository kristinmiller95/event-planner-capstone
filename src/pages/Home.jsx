// ===== LANDING PAGE =====

import { Link } from "react-router-dom";
import "../app.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-container">
        <main className="home-content">
          <h1 className="hp-title">Chronicle</h1>
          <h1 className="hp-slogan">
            Your universe of time, <br />
            <i>perfectly in sync</i>
          </h1>

          <div className="auth-actions">
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
            <Link to="/register" className="btn btn-outline">
              Create Account
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
