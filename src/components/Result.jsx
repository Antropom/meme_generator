import React, { useState, useEffect, useRef } from 'react';
import './component.css';
const HEIGHT = 400;

const Result = (props) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const { topSentence, bottomSentence, selectedImg, setCanvasDL } = props;

  useEffect(() => {
    const img = new Image();
    img.src = selectedImg;
    img.onload = () => setImage(img);
  }, [selectedImg]);

  useEffect(() => {
    if (!image) return;
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    const ratio = image.height / HEIGHT;
    canvasObj.height = HEIGHT;
    canvasObj.width = image.width / ratio;
    ctx.drawImage(image, 0, 0, canvasObj.width, HEIGHT);
    ctx.fillStyle = 'black';
    ctx.font = `24pt impact`;
    ctx.textAlign = 'center';
    const top = Math.floor(HEIGHT * 0.1);
    const bottom = Math.floor(HEIGHT * 0.95);
    ctx.fillText(topSentence, canvasObj.width / 2, top + 1);
    ctx.fillText(bottomSentence, canvasObj.width / 2, bottom + 1);
    ctx.fillText(topSentence, canvasObj.width / 2, top - 1);
    ctx.fillText(bottomSentence, canvasObj.width / 2, bottom - 1);
    ctx.fillText(topSentence, canvasObj.width / 2 + 1, top);
    ctx.fillText(bottomSentence, canvasObj.width / 2 + 1, bottom);
    ctx.fillText(topSentence, canvasObj.width / 2 - 1, top + 1);
    ctx.fillText(bottomSentence, canvasObj.width / 2 - 1, bottom);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(topSentence, canvasObj.width / 2, top);
    ctx.fillText(bottomSentence, canvasObj.width / 2, bottom);
  }, [topSentence, bottomSentence, image]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      onClick={(e) => setCanvasDL(canvasRef)}
    />
  );
};

export default Result;
