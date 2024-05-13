import express from 'express';
import bodyParser from 'body-parser';
import Drawing from '../models/Drawing.js';

const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));

// Route to get all drawings
router.get('/', async (req, res) => {
  try {
    const drawings = await Drawing.findAll();
    res.status(200).json(drawings);
  } catch (err) {
    console.error("Error fetching drawings:", err);
    res.status(500).json({ message: "Failed to fetch drawings." });
  }
});

// Route to create a new note
router.post('/', async (req, res) => {
  const { title, content, color, reminder, labels } = req.body;

  try {
    let newNote;
    // Check if image_data is included in the request
    if (req.file) {
      const image_data = req.file.buffer; // Extract image data from the request
      const binaryImageData = Buffer.from(image_data, 'binary');
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


// Route to delete a drawing
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const drawing = await Drawing.findByPk(id);
    if (!drawing) {
      return res.status(404).json({ message: 'Drawing not found.' });
    }
    await drawing.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting drawing:", error);
    res.status(500).json({ message: 'Failed to delete drawing.' });
  }
});

export default router;