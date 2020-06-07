import React, { useState, useEffect, useRef } from 'react';

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
    ctx.font = `24px impact`;
    canvasObj.height = image.height;
    canvasObj.width = image.width;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.fillStyle = 'black';
    const top = Math.floor(image.height * 0.05);
    const bottom = Math.floor(image.height * 0.8);
    ctx.fillText(topSentence, 11, top + 1);
    ctx.fillText(bottomSentence, 11, bottom + 1);
    ctx.fillStyle = 'white';
    ctx.fillText(topSentence, 10, top);
    ctx.fillText(bottomSentence, 10, bottom);
  }, [topSentence, bottomSentence, image]);

  return <canvas ref={canvasRef} />;
};

export default Result;
