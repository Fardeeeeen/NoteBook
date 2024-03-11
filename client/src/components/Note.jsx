import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ArchiveIcon from "@material-ui/icons/Archive";
import RestoreIcon from "@material-ui/icons/Restore";
import Tooltip from "@material-ui/core/Tooltip";
import LabelIcon from "@material-ui/icons/Label";
import LabelComponent from './LabelComponent';


const API_URL = "http://localhost:5000/api/notes";

function Note({ id, title, content, color, image_data,reminder, onDelete, onArchive, onRestore, isTrashPage, hideArchiveButton, onUpdateLabels,labels}) {
 
const [showLabelEditPopup, setShowLabelEditPopup] = useState(false);
const toggleLabelEditPopup = () => {
    setShowLabelEditPopup(!showLabelEditPopup);
  };
const handleArchive = () => onArchive(id);
const handleDelete = () => onDelete(id);
const handleRestore = () => onRestore(id);

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

  return (
    <div className="note" style={{ backgroundColor: color }}>
      <div className="note-content">
        <h1
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h1>
        <div className="labelsInNote">
        {labels && labels.map(label => (
        <span key={label} className="label">{label}</span>
      ))}
      </div>
        {content && <p>{content}</p>}
        {reminder && <div className="reminder-bubble">{reminder}</div>}
        {image_data && typeof image_data === 'object' && (
  <img
    src={`data:image/jpeg;base64,${arrayBufferToBase64(image_data.data)}`}
    alt="Note Image"
    style={{ maxWidth: "100%", maxHeight: "200px" }}
  />
)}
      </div>
      <div className="note-buttons">
        <Tooltip title="Labels">
          <button
            onClick={toggleLabelEditPopup}
            style={{ backgroundColor: color }}
          >
            <LabelIcon />
          </button>
        </Tooltip>
        {showLabelEditPopup && (
          <LabelComponent
            id={id}
            labels={labels}
            onUpdateLabels={onUpdateLabels}
            onAddLabel={(label) => handleLabelOperation('add', label)}
            onDeleteLabel={(label) => handleLabelOperation('delete', label)}
            onClose={toggleLabelEditPopup}
          />
        )}
        {!hideArchiveButton && (
          <Tooltip title="Archive">
            <button
              onClick={handleArchive}
              style={{ backgroundColor: color }}
            >
              <ArchiveIcon />
            </button>
          </Tooltip>
        )}
        <Tooltip title="Delete">
          <button onClick={() => handleDelete(id)} style={{ backgroundColor: color }}>
            <DeleteIcon />
          </button>
        </Tooltip>
        {isTrashPage && (
          <Tooltip title="Restore">
            <button
              onClick={handleRestore}
              style={{ backgroundColor: color }}
            >
              <RestoreIcon />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default Note;