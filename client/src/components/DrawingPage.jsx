import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import DrawingPopup from './DrawingPopup';

const DRAWINGS_API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/drawings`;

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

 const chunkSize = 1024 * 1024; // 1 MB chunk size

const handleSaveDrawing = async () => {
  if (canvasRef.current) {
    const drawingData = canvasRef.current.getSaveData();
    const dataUrl = canvasRef.current.canvas.drawing.toDataURL();
    const lines = JSON.parse(drawingData).lines;
    const width = canvasRef.current.canvas.width;
    const height = canvasRef.current.canvas.height;
    const binaryData = atob(dataUrl.split(',')[1]);
    const totalChunks = Math.ceil(binaryData.length / chunkSize);

    if (!Array.isArray(lines) || !lines.length) {
      console.error("Invalid drawing data format.");
      return;
    }
    
 for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min((i + 1) * chunkSize, binaryData.length);
      const chunk = binaryData.slice(start, end);
      try {
        await axios.post(DRAWINGS_API_URL, {
          lines: lines,
          width: width,
          height: height,
          data_url: chunk,
          chunkIndex: i,
          totalChunks: totalChunks,
        });
      } catch (error) {
        console.error("Error saving chunk:", error);
        // Handle error appropriately
      }
    }
    setIsPopupOpen(false);
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