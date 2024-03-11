import React from "react";
import Note from "./Note";

function RemindersPage({ notes }) {
  const reminderNotes = notes.filter((note) => note.reminder);

  return (
    <div className="notes-container">
      <h2>Reminders</h2>
      {reminderNotes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          color={noteItem.color}
          image={noteItem.image}
          reminder={noteItem.reminder}
          labels={noteItem.labels}
          onDelete={() => {}}
          onArchive={() => {}}
          onUpdateLabels={() => {}}
        />
      ))}
    </div>
  );
}

export default RemindersPage;