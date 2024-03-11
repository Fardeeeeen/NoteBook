import React from "react";
import Note from "./Note";

function ArchivedNotesPage({ archivedNotes, onDelete, onUnarchive }) {

  return (
    <div className="notes-container">
      <h2>Archived Notes</h2>
      {archivedNotes.map((noteItem) => (
        <Note
          key={noteItem.id} 
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          color={noteItem.color}
          image={noteItem.image}
          reminder={noteItem.reminder}
          onDelete={() => onDelete(noteItem.id)} 
          onArchive={() => onUnarchive(noteItem.id)}
        />
      ))}
    </div>
  );
}

export default ArchivedNotesPage;