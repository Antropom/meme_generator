import React, { useEffect, useRef } from 'react';

const Result = (props) => {
  const canvasRef = useRef(null);
  const { topSentence, bottomSentence, selectedImg } = props;

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    const img = new Image();
    img.src = selectedImg;
    canvasObj.height = img.height;
    canvasObj.width = img.width;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  }, [topSentence, bottomSentence, selectedImg]);

  return <canvas ref={canvasRef} />;
};

export default Result;
