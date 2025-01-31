import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/network-data";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";
import PropTypes from "prop-types";

function Navbar({ isAuth, setAuth, userName, setUserName }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleLogout = () => {
    logout();
    setAuth(false);
    setUserName(""); // Clear the username
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
      }`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          {isAuth
            ? `${language === "en" ? "Hello" : "Halo"}, ${userName}`
            : `${language === "en" ? "Notes Application" : "Aplikasi Catatan"}`}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    {language === "en" ? "Notes list" : "Daftar Catatan"}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/notes/new">
                    {language === "en" ? "Add note" : "Tambah Catatan"}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/archived">
                    {language === "en" ? "Archived notes" : "Catatan Terarsip"}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    {language === "en" ? "Logout" : "Keluar"}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    {language === "en" ? "Login" : "Masuk"}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    {language === "en" ? "Register" : "Daftar"}
                  </Link>
                </li>
              </>
            )}
            <span className="border-start"></span>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={toggleTheme}>
                {theme === "light" ? "🌛" : "🌞"}
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={toggleLanguage}
              >
                {language === "en" ? "Bahasa" : "English"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  setAuth: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
};

export default Navbar;
