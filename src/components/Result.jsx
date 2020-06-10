import React, { useState, useEffect, useRef } from 'react';
import './component.css'
const HEIGHT = 400;

const Result = (props) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const { topSentence, bottomSentence, selectedImg } = props;

  useEffect(() => {
    const img = new Image();
    img.src = selectedImg;
    img.onload = () => setImage(img);
  }, [selectedImg]);

  useEffect(() => {
    console.log(image, topSentence, bottomSentence);
    if (!image) return;
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    const ratio = image.height / HEIGHT;
    canvasObj.height = HEIGHT;
    canvasObj.width = image.width / ratio;
    ctx.drawImage(image, 0, 0, canvasObj.width, HEIGHT);
    ctx.fillStyle = 'black';
    const top = Math.floor(HEIGHT * 0.1);
    const bottom = Math.floor(HEIGHT * 0.8);
    ctx.font = `24pt impact`;
    ctx.fillText(topSentence, 11, top + 1);
    ctx.fillText(bottomSentence, 11, bottom + 1);
    ctx.font = `24pt impact`;
    ctx.fillStyle = 'white';
    ctx.fillText(topSentence, 10, top);
    ctx.fillText(bottomSentence, 10, bottom);
  }, [topSentence, bottomSentence, image]);

  return (
      <canvas ref={canvasRef} />
    );
};

export default Result;
