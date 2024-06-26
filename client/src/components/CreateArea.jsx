import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import PaletteIcon from "@material-ui/icons/Palette";
import ImageIcon from "@material-ui/icons/Image";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import { DatePicker } from "@material-ui/pickers";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/notes`;

function CreateArea({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);
  const [isColorPaletteOpen, setColorPaletteOpen] = useState(false);
  const [isReminderOpen, setReminderOpen] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    color: "white",
    image_data: null,
    reminder: null,
  });

  const [selectedColor, setSelectedColor] = useState("white");

 async function submitNote(event) {
  event.preventDefault();
  try {
    let dataToSend;

    if (note.image_data) {
      // If image data exists, create a FormData object
      dataToSend = new FormData();
      dataToSend.append('title', note.title);
      dataToSend.append('content', note.content);
      dataToSend.append('image_data', note.image_data);
      dataToSend.append('color', note.color);
      if (note.reminder) {
        dataToSend.append('reminder', note.reminder);
      }
    } else {
      // If no image data, send a regular object
      dataToSend = {
        title: note.title,
        content: note.content,
        color: note.color,
        reminder: note.reminder,
      };
    }

    // Send data with either FormData or regular object
    await onAdd(dataToSend);

    // Reset note state after submission
    setNote({
      title: "",
      content: "",
      color: "white",
      image_data: null,
      reminder: null,
    });
  } catch (error) {
    console.error("Error creating note:", error);
  }
}

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleColorChange(color) {
    setNote((prevNote) => ({
      ...prevNote,
      color: color,
    }));
    setSelectedColor(color);
    toggleColorPalette();
  }

  async function handleImageChange(event) {
    const imageFile = event.target.files[0];

    if (imageFile) {
      setNote((prevNote) => ({
        ...prevNote,
        image_data: imageFile,
      }));
    }
  }

  function handleReminderChange(date) {
    setNote((prevNote) => ({
      ...prevNote,
      reminder: date,
    }));
  }

  function expand() {
    setExpanded(true);
  }

  function toggleColorPalette() {
    setColorPaletteOpen((prevState) => !prevState);
  }

  function toggleReminderOptions() {
    setReminderOpen((prevState) => !prevState);
  }

  return (
    <div>
      <form className="create-note">
        {!isExpanded && (
          <textarea
            name="content"
            onClick={expand}
            value={note.content}
            placeholder="Take a note..."
            rows={1}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: "16px",
              padding: "8px",
            }}
          />
        )}
        {isExpanded && (
          <>
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "16px",
                padding: "8px",
              }}
            />
            {note.image_data && (
              <img
                src={URL.createObjectURL(note.image_data)}
                alt="Note Image"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
            <textarea
              name="content"
              onChange={handleChange}
              value={note.content}
              placeholder="Take a note..."
              rows={3}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                resize: "none",
                fontSize: "16px",
                padding: "8px",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "normal",
                marginTop: 10,
                justifyContent: "space-evenly",
              }}
            >
              <PaletteIcon
                onClick={toggleColorPalette}
                style={{ marginRight: 10, fontSize: 24, cursor: "pointer" }}
              />
              <label htmlFor="image-upload">
                <ImageIcon
                  style={{ cursor: "pointer", fontSize: 24, marginRight: 10 }}
                />
              </label>
              <input
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <AddAlertIcon
                onClick={toggleReminderOptions}
                style={{ marginRight: 10, cursor: "pointer", fontSize: 24 }}
              />
              {isReminderOpen && (
                <DatePicker
                  label="Reminder"
                  value={note.reminder}
                  onChange={handleReminderChange}
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  renderInput={(props) => <input {...props} />}
                />
              )}
            </div>
            {isColorPaletteOpen && (
              <div style={{ display: "flex", marginTop: 10 }}>
                <div
                  style={{
                    backgroundColor: "#B2DFDB",
                    width: 30,
                    height: 30,
                    margin: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorChange("#B2DFDB")}
                />
                <div
                  style={{
                    backgroundColor: "#FFE082",
                    width: 30,
                    height: 30,
                    margin: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorChange("#FFE082")}
                />
                <div
                  style={{
                    backgroundColor: "#81C784",
                    width: 30,
                    height: 30,
                    margin: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorChange("#81C784")}
                />
                <div
                  style={{
                    backgroundColor: "#E57373",
                    width: 30,
                    height: 30,
                    margin: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorChange("#E57373")}
                />
                <div
                  style={{
                    backgroundColor: "#E0E0E0",
                    width: 30,
                    height: 30,
                    margin: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorChange("#E0E0E0")}
                />
              </div>
            )}
            <Zoom in={isExpanded}>
              <Fab onClick={submitNote} style={{ marginTop: 10 }}>
                <AddIcon />
              </Fab>
            </Zoom>
          </>
        )}
      </form>
    </div>
  );
}

export default CreateArea;