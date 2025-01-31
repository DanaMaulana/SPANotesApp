import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import { LanguageContext } from "../contexts/LanguageContext";

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchNote = async () => {
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    await deleteNote(id);
    navigate("/");
  };

  if (loading) {
    return (
      <p className="text-center">
        {language === "en" ? "Loading..." : "Memuat..."}
      </p>
    );
  }

  return (
    <div className="container mt-4">
      <span className="h2">{note.title}</span>
      <p>{showFormattedDate(note.createdAt)}</p>
      <p className="mt-5">{note.body}</p>
      <button className="btn btn-danger" onClick={handleDelete}>
        {language === "en" ? "Delete Notes" : "Hapus Catatan"}
      </button>
    </div>
  );
}

export default NoteDetailPage;
