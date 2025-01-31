import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../contexts/LanguageContext";

function SearchBar({ onSearch, initialValue }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="mt-4 mb-3">
      <input
        type="text"
        placeholder={`${
          language === "en" ? "Search notes..." : "Cari catatan..."
        }`}
        defaultValue={initialValue} // Gunakan nilai awal dari query parameter
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

// Validasi properti dengan prop-types
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  initialValue: PropTypes.string, // Tambahkan validasi untuk properti baru
};

export default SearchBar;
