import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import Drawing from '../models/Drawing.js';

const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));


router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

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

// Route to save a new drawing
router.post('/', async (req, res) => {
  try {
    const { lines, data_url,height, width} = req.body;

    if (!lines || !data_url) {
      console.error("Invalid drawing data:", { lines, data_url,height , width,updatedat, createdat });
      return res.status(400).json({ message: "Lines and dataURL are required." });
    }
    const newDrawing = await Drawing.create({
      lines: lines,
      width: width,
      height: height,
      data_url: data_url,
      createdat: new Date(),
      updatedat: new Date() 
    });
    res.status(201).json(newDrawing);
  } catch (err) {
    console.error("Error saving drawing:", err);
    res.status(500).json({ message: "Failed to save drawing." });
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