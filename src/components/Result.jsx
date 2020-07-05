import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './component.css';
const HEIGHT = 400;

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '100%',
  },
}));

const Result = (props) => {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const { topSentence, bottomSentence, selectedImg } = props;

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
    ctx.fillText(topSentence, canvasObj.width / 2, top + 1, canvasObj.width);
    ctx.fillText(
      bottomSentence,
      canvasObj.width / 2,
      bottom + 1,
      canvasObj.width
    );
    ctx.fillText(topSentence, canvasObj.width / 2, top - 1, canvasObj.width);
    ctx.fillText(
      bottomSentence,
      canvasObj.width / 2,
      bottom - 1,
      canvasObj.width
    );
    ctx.fillText(topSentence, canvasObj.width / 2 + 1, top, canvasObj.width);
    ctx.fillText(
      bottomSentence,
      canvasObj.width / 2 + 1,
      bottom,
      canvasObj.width
    );
    ctx.fillText(
      topSentence,
      canvasObj.width / 2 - 1,
      top + 1,
      canvasObj.width
    );
    ctx.fillText(
      bottomSentence,
      canvasObj.width / 2 - 1,
      bottom,
      canvasObj.width
    );
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(topSentence, canvasObj.width / 2, top, canvasObj.width);
    ctx.fillText(bottomSentence, canvasObj.width / 2, bottom, canvasObj.width);
  }, [topSentence, bottomSentence, image]);

  return <canvas ref={canvasRef} className={classes.image} />;
};

export default Result;
