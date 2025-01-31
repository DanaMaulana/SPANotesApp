import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getActiveNotes, archiveNote } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import SearchBar from "../components/SearchBar";
import { LanguageContext } from "../contexts/LanguageContext";

function NotesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  const query = searchParams.get("query") || "";

  const handleSearch = (searchQuery) => {
    setSearchParams({ query: searchQuery });
  };

  const handleArchive = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getActiveNotes();
      setNotes(data);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <p className="text-center">
        {language === "en" ? "Loading..." : "Memuat..."}
      </p>
    );
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <span className="h2">
        {language === "en" ? "Notes List" : "Daftar Catatan"}
      </span>
      <SearchBar onSearch={handleSearch} initialValue={query} />
      {filteredNotes.length === 0 ? (
        <p>{language === "en" ? "No Notes" : "Tidak ada catatan"}</p>
      ) : (
        <div className="row">
          {filteredNotes.map((note) => (
            <div className="col-md-4 mb-3" key={note.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">
                    {showFormattedDate(note.createdAt)}
                  </p>
                  <p className="card-text">
                    {note.body.length > 150
                      ? `${note.body.substring(0, 150)}...`
                      : note.body}
                  </p>
                  <Link to={`/notes/${note.id}`} className="btn btn-primary">
                    {language === "en" ? "View Details" : "Lihat Detail"}
                  </Link>
                  <button
                    onClick={() => handleArchive(note.id)}
                    className="btn btn-secondary ms-2"
                  >
                    {language === "en" ? "Archive" : "Arsip"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesListPage;
