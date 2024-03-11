import React from "react";
import { useParams } from "react-router-dom";

function SearchedNote({ notes }) {
  const { id } = useParams();

  if (!id) {
    console.error("No search query provided.");
    return <div>No search query provided.</div>;
  }

  const titleMatches = notes.filter(
    (note) =>
      note && note.title && note.title.toLowerCase().includes(id.toLowerCase())
  );

  const contentMatches = notes.filter(
    (note) =>
      note &&
      note.content &&
      note.content.toLowerCase().includes(id.toLowerCase())
  );

  const filteredNotes = titleMatches.concat(contentMatches.filter(contentNote => !titleMatches.some(titleNote => titleNote.title === contentNote.title)));

  if (filteredNotes.length === 0) {
    console.log("No notes found with query:", id);
    return <div>No notes found</div>;
  }

  return (
    <div>
      {filteredNotes.map((note, index) => (
        <div key={index} className="searched-note">
          <h1>{note.title}</h1>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchedNote;