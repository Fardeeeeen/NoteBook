import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/notes`;

const useStyles = makeStyles((theme) => ({
  labelContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    zIndex: 1000,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

function LabelEditPopup({ id, currentLabel, onUpdateLabel, onClose }) {
  const classes = useStyles();
  const [editedLabel, setEditedLabel] = useState(currentLabel);

  const handleSave = async () => {
  try {
    if (editedLabel.trim() !== '') {
      const response = await axios.patch(`${API_URL}/${id}/update-label`, { label: editedLabel.trim() });
      const updatedLabel = response.data.label;
      onUpdateLabel(updatedLabel);
      setEditedLabel('');
    }
  } catch (error) {
    console.error("Error updating label:", error);
  }
};

  return (
    <div className={classes.labelContainer}>
      <TextField
        id="label-edit-input"
        label="Edit Label"
        variant="outlined"
        value={editedLabel}
        onChange={(e) => setEditedLabel(e.target.value)}
        className={classes.textField}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" onClick={onClose}>Close</Button>
    </div>
  );
}

export default LabelEditPopup;