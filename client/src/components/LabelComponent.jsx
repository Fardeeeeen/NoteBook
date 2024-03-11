import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/notes";

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
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function LabelComponent({ id, labels, onUpdateLabels, onClose }) {
  const classes = useStyles(); 
  const [newLabel, setNewLabel] = useState('');
  

  const handleAddLabel = async () => {
  try {
    if (newLabel.trim() !== '') {
      await axios.patch(`${API_URL}/${id}/add-label`, { label: newLabel.trim() });
      onUpdateLabels([...labels, newLabel.trim()]);
      setNewLabel('');
    }
  } catch (error) {
    console.error("Error adding label:", error);
  }
};

const handleDeleteLabel = async (labelToDelete) => {
  try {
    await axios.patch(`${API_URL}/${id}/delete-label`, { label: labelToDelete });
    onUpdateLabels(labels.filter(label => label !== labelToDelete));
  } catch (error) {
    console.error("Error deleting label:", error);
  }
};
  
  return (
    <div className={classes.labelContainer}>
      <TextField
        id="label-input"
        label="Add Label"
        variant="outlined"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        className={classes.textField}
      />
      <Button variant="contained" color="primary" onClick={handleAddLabel}>
        Add
      </Button>
      {labels && labels.map((label) => (
        <Chip
          key={label}
          label={label}
          onDelete={() => handleDeleteLabel(label)}
          className={classes.chip}
        />
      ))}
      <Button variant="outlined" onClick={onClose}>Close</Button>
    </div>
  );
}

export default LabelComponent;