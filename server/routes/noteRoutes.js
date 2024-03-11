import express from 'express';
import Note from '../models/Note.js';
import bodyParser from 'body-parser';
import sharp from 'sharp';


const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));

// Route to get all notes 
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new note 
router.post('/', async (req, res) => {
  const { title, content, color, reminder, labels, image_data } = req.body;

  try {
    let newNote;
    if (image_data) {
      const binaryImageData = Buffer.from(image_data.data, 'binary');
      const compressedImageData = await sharp(binaryImageData)
        .resize(200) 
        .jpeg({ quality: 50 }) 
        .toBuffer(); 

      newNote = await Note.create({ title, content, color, reminder, labels, image_data: compressedImageData });
    } else {
      newNote = await Note.create({ title, content, color, reminder, labels });
    }
    res.status(201).json(newNote);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(400).json({ message: err.message });
  }
});

// Route to move a note to trash
router.patch('/:id/move-to-trash', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.deleted = true;
    await note.save();
    res.json({ message: 'Note moved to trash successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to restore a note from trash
router.patch('/:id/restore', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.deleted = false;
    await note.save();
    res.json({ message: 'Note restored successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to delete a note permanently
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    await note.destroy();
    res.json({ message: 'Note deleted permanently' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to archive a note
router.patch('/:id/archive', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.archived = true;
    await note.save();
    res.json({ message: 'Note archived successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to unarchive a note
router.patch('/:id/unarchive', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.archived = false;
    await note.save();
    res.json({ message: 'Note unarchived successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a label to a note
router.patch('/:id/add-label', getNote, async (req, res) => {
  const { label } = req.body;

  if (!label) {
    return res.status(400).json({ message: 'Label is required' });
  }

  try {
    res.note.labels.push(label);
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a label from a note
router.patch('/:id/delete-label', getNote, async (req, res) => {
  const { label } = req.body;

  if (!label) {
    return res.status(400).json({ message: 'Label is required' });
  }

  try {
    res.note.labels = res.note.labels.filter((l) => l !== label);
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update labels in a note
router.patch('/:id/update-labels', getNote, async (req, res) => {
  const { labels } = req.body;

  if (!labels) {
    return res.status(400).json({ message: 'Labels are required' });
  }

  try {
    res.note.labels = labels;
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Middleware function to get a single note by ID
async function getNote(req, res, next) {
  let note;
  try {
    note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Cannot find note' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.note = note;
  next();
}

export default router;