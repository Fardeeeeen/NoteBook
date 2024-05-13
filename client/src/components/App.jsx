import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import CreateArea from "./CreateArea";
import SidePanel from "./SidePanel";
import Note from "./Note";
import ArchivedNotesPage from "./ArchivedNotesPage";
import RemindersPage from "./RemindersPage";
import TrashPage from "./TrashPage";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import LabelEditPopup from "./LabelEditPopup";
import DrawingPage from "./DrawingPage";
import DrawingPopup from "./DrawingPopup";
import SearchedNote from "./SearchedNote";
import Footer from "./Footer";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/notes`;
const DRAWINGS_API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/drawings`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: "1",
  },
  mainContent: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "60px",
    marginBottom: "60px",
  },
}));

function App() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [showEditLabelPopup, setShowEditLabelPopup] = useState(false);
  const [isDrawingPopupOpen, setIsDrawingPopupOpen] = useState(false);
  const [savedDrawings, setSavedDrawings] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);


  const fetchNotes = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await axios.get(`${API_URL}?timestamp=${timestamp}`);
      const fetchedNotes = response.data;

      const activeNotes = fetchedNotes.filter(note => {
        return !note.deleted && !note.archived;
      });

      setNotes(activeNotes);
      setDeletedNotes(fetchedNotes.filter(note => note.deleted));
      setArchivedNotes(fetchedNotes.filter(note => note.archived));
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

const addNote = async (newNote) => {
  try {
    let response;
    // Check if newNote is an instance of FormData
    if (newNote instanceof FormData) {
      response = await axios.post(API_URL, newNote, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      response = await axios.post(API_URL, newNote);
    }
    setNotes((prevNotes) => [...prevNotes, response.data]);
  } catch (error) {
    console.error("Error adding note:", error.response);
  }
};


const moveNoteToTrash = async (id) => {
  try {
    await axios.patch(`${API_URL}/${id}/move-to-trash`);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    setDeletedNotes(prevDeletedNotes => [
      ...prevDeletedNotes,
      notes.find(note => note.id === id)
    ]);
  } catch (error) {
    console.error("Error moving note to trash:", error);
  }
};

// Restore note from trash
const restoreNoteFromTrash = async (id) => {
  try {
    await axios.patch(`${API_URL}/${id}/restore`);
    fetchNotes(); 
  } catch (error) {
    console.error("Error restoring note from trash:", error);
  }
};

// Permanently delete note
const deleteNotePermanently = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  } catch (error) {
    console.error("Error deleting note permanently:", error);
  }
};

const handleArchive = async (id) => {
  try {
    await axios.patch(`${API_URL}/${id}/archive`);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));    
    setArchivedNotes(prevArchivedNotes => [
      ...prevArchivedNotes,
      notes.find(note => note.id === id)
    ]);
  } catch (error) {
    console.error("Error archiving note:", error);
  }
};

  const unarchiveNote = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/unarchive`);
      fetchNotes();
    } catch (error) {
      console.error("Error unarchiving note:", error);
    }
  };

const updateLabelsInNote = async (id, updatedLabels) => {
  try {
    const url = `${API_URL}/${id}/update-labels`;
    const requestData = { labels: updatedLabels };
    const response = await axios.patch(url, requestData);
    const updatedNote = response.data;
    setNotes(prevNotes => prevNotes.map(note => (note.id === id ? updatedNote : note)));
  } catch (error) {
    console.error("Error updating labels in note:", error);
  }
};

 const handleSaveDrawing = async (drawingData, setIsDrawingPopupOpen, setSavedDrawings) => {
  try {
    const response = await axios.post(DRAWINGS_API_URL, drawingData);
    setSavedDrawings((prevDrawings) => [...prevDrawings, response.data]);
    setIsDrawingPopupOpen(false);
  } catch (error) {
    console.error("Error saving drawing:", error);
  }
};

  const handleSearch = (searchQuery) => {
    navigate(`/searched-note/${searchQuery}`);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <Router>
          <Header onSearch={handleSearch} />
          <div className={classes.main}>
            <SidePanel />
            <div className={classes.mainContent}>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                      <>
                        <CreateArea onAdd={addNote} />
                        {notes.map((noteItem) => (
                          <Note
                            key={noteItem.id}
                            id={noteItem.id}
                            title={noteItem.title}
                            content={noteItem.content}
                            color={noteItem.color}
                            image_data={noteItem.image_data}
                            reminder={noteItem.reminder}
                            labels={noteItem.labels}
                            onDelete={() => moveNoteToTrash(noteItem.id)}
                            onArchive={() => handleArchive(noteItem.id)}
                            onUnarchive={() => unarchiveNote(noteItem.id)}
                            onUpdateLabels={(updatedLabels) => updateLabelsInNote(noteItem.id, updatedLabels)}
                          />
                        ))}
                      </>
                  }
                />
                <Route
                  path="/archive"
                  element={
                    <ArchivedNotesPage
                      archivedNotes={archivedNotes}
                      onDelete={deleteNotePermanently}
                      onUnarchive={unarchiveNote}
                    />
                  }
                />
                <Route
                  path="/reminders"
                  element={<RemindersPage notes={notes} />}
                />
                <Route
                  path="/trash"
                  element={
                    <TrashPage
                      deletedNotes={deletedNotes}
                      onDelete={deleteNotePermanently}
                      onRestore={restoreNoteFromTrash}
                    />
                  }
                />
                <Route
                  path="/drawing"
                  element={
                    <>
                      <DrawingPage
                        savedDrawings={savedDrawings}
                        onSaveDrawing={(drawingData) => handleSaveDrawing(drawingData, setIsDrawingPopupOpen, setSavedDrawings)}
                      />
                      {isDrawingPopupOpen && (
                        <DrawingPopup
                          isOpen={isDrawingPopupOpen}
                          onClose={() => setIsDrawingPopupOpen(false)}
                          onSave={(drawingData) => handleSaveDrawing(drawingData, setIsDrawingPopupOpen, setSavedDrawings)}
                        />
                      )}
                    </>
                  }
                />
                <Route
                  path="/searched-note/:id"
                  element={<SearchedNote notes={notes} />}
                />
              </Routes>
            </div>
          </div>
        </Router>
        {showEditLabelPopup && (
          <LabelEditPopup
            onClose={() => setShowEditLabelPopup(false)}
            onSave={saveLabelEdit}
            currentLabel={""}
          />
        )}
        <Footer />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;