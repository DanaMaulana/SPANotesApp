import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../utils/network-data";
import { LanguageContext } from "../contexts/LanguageContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert(
        language === "en" ? "Passwords do not match" : "Kata sandi tidak cocok"
      );
      return;
    }
    const { error } = await register({ name, email, password });
    if (!error) {
      navigate("/login");
    }
  };

  return (
    <div className="container mt-4">
      <span className="h2">{language === "en" ? "Register" : "Daftar"}</span>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            {language === "en" ? "Name" : "Nama"}
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            {language === "en" ? "Confirm Password" : "Konfirmasi Kata sandi"}
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {language === "en" ? "Register" : "Daftar"}
        </button>
      </form>
      <p className="mt-3">
        {language === "en" ? "Already have an account?" : "Sudah punya akun?"}{" "}
        <Link to="/login" className="link-primary">
          {language === "en" ? "Please login" : "Silahkan masuk"}
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
