// TrashPage.jsx
import React from "react";
import Note from "./Note";

function TrashPage({ deletedNotes, onDelete, onRestore }) {
  return (
    <div className="notes-container">
      <h2>Deleted Notes</h2>
      {deletedNotes.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          color={noteItem.color}
          image={noteItem.image}
          reminder={noteItem.reminder}
          onDelete={() => onDelete(noteItem.id)}
          onRestore={() => onRestore(noteItem.id)}
          isTrashPage={true}
          hideArchiveButton={true}
        />
      ))}
    </div>
  );
}

export default TrashPage;