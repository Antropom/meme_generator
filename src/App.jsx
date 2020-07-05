import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Sentence from './components/Sentence';
import axios from 'axios';
import PicsList from './components/PicsList';
import Result from './components/Result';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '90vw',
    margin: '0 auto',
  },
  title: {
    marginBottom: '2px',
  },
  subTitle: {
    marginTop: 0,
    textAlign: 'right',
  },
  picsList: {
    maxHeight: '33vh',
    overflowY: 'scroll',
  },
  paper: {
    width: '90vw',
    padding: 2 * theme.spacing(),
    marginBottom: '25px',
  },
  sentence: {
    width: '100%',
  },
}));

function App() {
  const [basePics, setBasePics] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [topSentence, setTopSentence] = useState('');
  const [bottomSentence, setBottomSentence] = useState('');
  const [listMeme, setListMeme] = useState([]);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/pics`)
      .then((res) => setBasePics(res.data));
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/memes`)
      .then((res) => setListMeme(res.data));
  }, []);

  const handlesubmit = () => {
    const picture = basePics.find((pic) => pic.url === selectedImg);
    const body = {
      base_pics_id: picture.id,
      txt1: topSentence,
      txt2: bottomSentence,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/memes`, body)
      .then((res) => setOpen(true))
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/memes`)
          .then((res) => setListMeme(res.data));
      });
    setTopSentence('');
    setBottomSentence('');
  };
  const missField = () => {
    setOpenError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenError(false);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <h1 className={classes.title}>{`Geoffroy Meme Generator`}</h1>
            <p className={classes.subTitle}>
              <em>{`Pensez à ne pas baisser la barre`}</em>
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid
            container
            justify="center"
            alignItems="center"
            item
            xs={12}
            md={6}
          >
            {selectedImg !== null ? (
              <Result
                topSentence={topSentence}
                bottomSentence={bottomSentence}
                selectedImg={selectedImg}
              />
            ) : (
              <h3 className="cursor-default">{`1) Choisissez une image`}</h3>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="column-reverse"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} className={classes.sentence}>
                <Sentence
                  topSentence={topSentence}
                  setTopSentence={setTopSentence}
                  bottomSentence={bottomSentence}
                  setBottomSentence={setBottomSentence}
                  handlesubmit={handlesubmit}
                  selectedImg={selectedImg}
                  missField={missField}
                />
              </Grid>
              <Grid
                item
                container
                className={classes.picsList}
                xs={12}
                spacing={1}
              >
                <PicsList
                  basePics={basePics}
                  setSelectedImg={setSelectedImg}
                  selectedImg={selectedImg}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {listMeme.reduce((a, b, i) => {
          const item = listMeme[listMeme.length - i - 1];
          const picture = basePics.find((pic) => item.base_pics_id === pic.id);
          a.push(
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Result
                topSentence={item.txt1}
                bottomSentence={item.txt2}
                selectedImg={picture && picture.url}
              />
            </Grid>
          );
          return a;
        }, [])}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Meme posté avec succès !
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Sélectionne au moins une photo et une phrase.
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default App;
