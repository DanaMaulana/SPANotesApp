import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getArchivedNotes, unarchiveNote } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import SearchBar from "../components/SearchBar";
import { LanguageContext } from "../contexts/LanguageContext";

function ArchivedNotesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);

  // Ambil nilai query dari URL
  const query = searchParams.get("query") || "";

  const handleSearch = (searchQuery) => {
    setSearchParams({ query: searchQuery }); // Perbarui query parameter di URL
  };

  const handleUnarchive = async (id) => {
    try {
      await unarchiveNote(id); // Fungsi untuk mengembalikan catatan dari arsip
      const { data } = await getArchivedNotes(); // Perbarui daftar catatan arsip
      setNotes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await getArchivedNotes();
        setNotes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
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

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <span className="h2">
        {language === "en" ? "Archive Records List" : "Daftar Catatan Arsip"}
      </span>
      <SearchBar onSearch={handleSearch} initialValue={query} />
      {filteredNotes.length === 0 ? (
        <p>
          {language === "en"
            ? "There are no archival records"
            : "Tidak ada catatan arsip"}
        </p>
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
                  <p className="card-text">{note.body}</p>
                  <Link to={`/notes/${note.id}`} className="btn btn-primary">
                    {language === "en" ? "View Details" : "Lihat Detail"}
                  </Link>
                  <button
                    onClick={() => handleUnarchive(note.id)}
                    className="btn btn-secondary ms-2"
                  >
                    {language === "en" ? "Unarchive" : "Batalkan Arsip"}
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

export default ArchivedNotesPage;
