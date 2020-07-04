import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
  },
  centered: {
    textAlign: 'center',
    width: '100%',
  },
  button: {
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
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
      spacing={4}
    >
      <Grid item xs={12} className={classes.root}>
        <h4
          className={classes.centered}
        >{`2) Merci de faire des memes drôles`}</h4>
      </Grid>
      <TextField
        className={classes.centered}
        id="standard-basic"
        label="Phrase du haut"
        type="text"
        name=""
        value={topSentence}
        onChange={(e) => setTopSentence(e.target.value.toUpperCase())}
      />
      <TextField
        className={classes.centered}
        id="standard-basic"
        label="Phrase du haut"
        type="text"
        name=""
        value={bottomSentence}
        onChange={(e) => setBottomSentence(e.target.value.toUpperCase())}
      />
      <Grid item xs={12} className={classes.root}>
        <div className={(classes.button, classes.centered)}>
          <Button
            variant="contained"
            disableElevation
            color="primary"
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
      </Grid>
    </Grid>
  );
}

export default Sentence;
