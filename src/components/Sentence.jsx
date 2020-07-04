import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Sentence({
  topSentence,
  setTopSentence,
  bottomSentence,
  setBottomSentence,
  handlesubmit,
  selectedImg,
  missField,
}) {
  const classes = useStyles();
  return (
    <>
      <h4 className="cursor-default">{`2) Merci de faire des memes drôles`}</h4>
      <TextField
        id="standard-basic"
        label="Phrase du haut"
        type="text"
        name=""
        value={topSentence}
        onChange={(e) => setTopSentence(e.target.value.toUpperCase())}
      />
      <TextField
        id="standard-basic"
        label="Phrase du haut"
        className="input"
        type="text"
        name=""
        value={bottomSentence}
        onChange={(e) => setBottomSentence(e.target.value.toUpperCase())}
      />
      <div className={classes.root}>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          className="cursor-pointer"
          onClick={() => {
            if (selectedImg !== null) {
              if (topSentence !== '' || bottomSentence !== '') {
                return handlesubmit();
              }
            }
            return missField();
          }}
        >
          {`Envoyer`}
        </Button>
        {/* <button className="cursor-pointer">Télécharger</button> */}
      </div>
    </>
  );
}

export default Sentence;
