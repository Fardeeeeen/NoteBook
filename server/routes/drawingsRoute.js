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

// Route to save drawings with chunking
router.post('/', async (req, res) => {
  try {
    const { lines, data_url, height, width, chunkIndex, totalChunks } = req.body;

    if (!lines || !data_url || height === undefined || width === undefined || chunkIndex === undefined || totalChunks === undefined) {
      console.error("Invalid drawing data:", { lines, data_url, height, width, chunkIndex, totalChunks });
      return res.status(400).json({ message: "Incomplete drawing data." });
    }

    if (!req.session.drawingData) {
      req.session.drawingData = Buffer.alloc(0);
    }

    const imageData = Buffer.from(data_url, 'base64');
    req.session.drawingData = Buffer.concat([req.session.drawingData, imageData]);

    if (chunkIndex === totalChunks - 1) {
      const finalDataUrl = `data:image/png;base64,${req.session.drawingData.toString('base64')}`;

      const newDrawing = await Drawing.create({
        lines: lines,
        width: width,
        height: height,
        data_url: finalDataUrl,
        createdat: new Date(),
        updatedat: new Date()
      });

      delete req.session.drawingData;

      res.status(201).json(newDrawing);
    } else {
      res.status(200).end();
    }
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