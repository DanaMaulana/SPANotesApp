import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, getUserLogged } from "../utils/network-data";
import { LanguageContext } from "../contexts/LanguageContext";
import PropTypes from "prop-types";

function LoginPage({ setAuth, setUserName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, data } = await login({ email, password });
    if (!error) {
      localStorage.setItem("accessToken", data.accessToken);
      const user = await getUserLogged();
      setUserName(user.data.name);
      setAuth(true);
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">
      <label className="h2">{language === "en" ? "Login" : "Masuk"}</label>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            {language === "en" ? "Password" : "Kata Sandi"}
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {language === "en" ? "Login" : "Masuk"}
        </button>
      </form>
      <p className="mt-3">
        {language === "en" ? "Don't have an account?" : "Belum punya akun?"}{" "}
        <Link to="/register" className="link-primary">
          {language === "en" ? "Register here" : "Daftar di sini"}
        </Link>
      </p>
    </div>
  );
}

LoginPage.propTypes = {
  setAuth: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
};

export default LoginPage;
