import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Sentence from './components/Sentence';
import 'noty/lib/noty.css';
import 'noty/lib/themes/metroui.css';
import axios from 'axios';
import Noty from 'noty';
import PicsList from './components/PicsList';
import Result from './components/Result';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '90vw',
    margin: '0 auto',
  },
  picsList: {
    maxHeight: '30vh',
    overflowY: 'scroll',
  },
  paper: {
    width: '90vw',
    padding: 2 * theme.spacing(),
  },
}));

function App() {
  const [basePics, setBasePics] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [topSentence, setTopSentence] = useState('');
  const [bottomSentence, setBottomSentence] = useState('');
  const [listMeme, setListMeme] = useState([]);
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
      .then((res) =>
        new Noty({
          type: 'success',
          theme: 'metroui',
          timeout: '1000',
          progressBar: false,
          text: 'Meme ajouté, merci de ta contribution',
        }).show()
      )
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/memes`)
          .then((res) => setListMeme(res.data));
      });
    setTopSentence('');
    setBottomSentence('');
  };
  const missField = () => {
    new Noty({
      type: 'error',
      theme: 'metroui',
      timeout: '1000',
      progressBar: false,
      text: 'Ajoute au moins une photo et une phrase de ton choix',
    }).show();
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container direction="column" justify="center" alignItems="center">
          <h1 className="cursor-default">{`Geoffroy Meme Generator`}</h1>
          <p className="legend">
            <em className="cursor-default">{`Pensez à ne pas baisser la barre`}</em>
          </p>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <Grid container>
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
            >
              <Grid item xs={12} md={12}>
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
              <Grid item container className={classes.picsList} xs={12}>
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
      <Grid container>
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
    </Grid>
  );
}

export default App;
