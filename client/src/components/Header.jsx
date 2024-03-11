// Header.jsx//
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, handleLogout }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    console.log('Search query changed:', event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting search query:', searchQuery);
    navigate(`/searched-note/${searchQuery}`);
  };



  return (
    <header>
      <h1>NoteBook</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <Link to="/">Login</Link>
        <span> / </span>
        <Link to="/">Signup</Link>
      </div>
    </header>
  );
}

export default Header;
