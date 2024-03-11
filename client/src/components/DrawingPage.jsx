import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import DrawingPopup from './DrawingPopup';

const DRAWINGS_API_URL = "http://localhost:5000/api/drawings";

const DrawingPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [savedDrawings, setSavedDrawings] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchDrawings();
  }, []);

  const fetchDrawings = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await axios.get(`${DRAWINGS_API_URL}?timestamp=${timestamp}`);
      const fetchedDrawings = response.data;
      setSavedDrawings(fetchedDrawings);
    } catch (error) {
      console.error("Error fetching saved drawings:", error);
    }
  };

  const handleDrawButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleDrawingClick = (drawing) => {
    setSelectedDrawing(drawing);
  };

  const handleCloseDrawing = () => {
    setSelectedDrawing(null);
  };

  const handleDownloadDrawing = (drawing) => {
    const link = document.createElement('a');
    link.href = drawing.data_url;
    link.download = `drawing_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveDrawing = async () => {
    if (canvasRef.current) {
      const drawingData = canvasRef.current.getSaveData();
      const data_url = canvasRef.current.canvas.drawing.toDataURL();

      const parsedData = JSON.parse(drawingData);

      if (!Array.isArray(parsedData.lines) || !parsedData.width || !parsedData.height) {
        console.error("Invalid drawing data format.");
        return;
      }

      const lines = parsedData.lines.filter(line => line.points && line.points.length > 1);

      const drawing = {
        lines: lines.map(line => ({
          points: line.points.map(point => ({ x: point.x, y: point.y })),
          brushColor: line.brushColor,
          brushRadius: line.brushRadius,
        })),
        width: parsedData.width,
        height: parsedData.height,
        data_url: data_url
      };

      if (drawing.lines.length === 0) {
        console.error("No valid lines to save.");
        return;
      }

      try {
        const response = await axios.post(DRAWINGS_API_URL, drawing);
        setSavedDrawings(prevDrawings => [...prevDrawings, response.data]);
        setIsPopupOpen(false);
      } catch (error) {
        console.error("Error saving drawing:", error);
      }
    }
  };

  const handleDeleteDrawing = async (drawingId) => {
    try {
      await axios.delete(`${DRAWINGS_API_URL}/${drawingId}`);
      setSavedDrawings(prevDrawings => prevDrawings.filter(drawing => drawing.id !== drawingId));
    } catch (error) {
      console.error("Error deleting drawing:", error);
    }
  };

  

  return (
    <div className="drawing-page">
      <h2>Drawings</h2>
      <button onClick={handleDrawButtonClick}>Draw</button>
      <div className="saved-drawings">
        {savedDrawings.map((drawing, index) => (
          <div key={index} className="drawing-note">
            <div className="tooltip">
              <img src={drawing.data_url} alt={`Drawing ${index}`} onClick={() => handleDrawingClick(drawing)} />
              <span className="tooltiptext">Preview</span>
            </div>
            <div className="button-container">
              <button onClick={() => handleDownloadDrawing(drawing)}>Download</button>
              <button onClick={() => handleDeleteDrawing(drawing.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <DrawingPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSaveDrawing}
          canvasRef={canvasRef}
        />
      )}
      {selectedDrawing && (
        <div className="selected-drawing">
          <div className="tooltip">
            <img src={selectedDrawing.data_url} alt="Selected Drawing" onClick={handleCloseDrawing} />
            <span className="tooltiptext">Close</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingPage;