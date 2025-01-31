import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import { LanguageContext } from "../contexts/LanguageContext";

function AddNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addNote({
      title,
      body,
    });
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <span className="h2">
        {language === "en" ? "Add New Note" : "Tambah Catatan Baru"}
      </span>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            {language === "en" ? "Title" : "Judul"}
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            {language === "en" ? "Content" : "Isi"}
          </label>
          <textarea
            id="body"
            className="form-control"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {language === "en" ? "Save" : "Simpan"}
        </button>
      </form>
    </div>
  );
}

export default AddNotePage;
