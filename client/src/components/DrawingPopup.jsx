import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

const DrawingPopup = ({ isOpen, onClose, onSave, canvasRef }) => {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(5);
  const [savedDrawingData, setSavedDrawingData] = useState(null);

  const handleDownload = () => {
    if (savedDrawingData) {
      const link = document.createElement('a');
      link.href = savedDrawingData.data_url;
      link.download = 'drawing.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`drawing-popup ${isOpen ? 'open' : ''}`}>
      <div className="drawing-area">
        <CanvasDraw
          ref={canvasRef}
          brushColor={brushColor}
          brushRadius={brushRadius}
          canvasWidth={800}
          canvasHeight={600}
          canvasBackgroundColor="#ffffff"
        />
        <div>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
          <input
            type="range"
            min="1"
            max="50"
            value={brushRadius}
            onChange={(e) => setBrushRadius(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Close</button>
        {savedDrawingData && (
          <button onClick={handleDownload}>Download</button>
        )}
      </div>
      {savedDrawingData && (
        <div className="saved-drawing">
          <img src={savedDrawingData.dataURL} alt="Saved Drawing" />
        </div>
      )}
    </div>
  );
};

export default DrawingPopup;