import React, { useState, useEffect } from 'react';
import Sentence from './components/Sentence';
import './App.css';
import 'noty/lib/noty.css';
import axios from 'axios';
import Noty from 'noty';
import Pics from './components/Pics';
import Result from './components/Result';
import List from './components/List';

function App() {
  const [basePics, setBasePics] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [topSentence, setTopSentence] = useState('');
  const [bottomSentence, setBottomSentence] = useState('');
  const [listMeme, setListMeme] = useState([]);

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
    new Noty ({
      text: 'Ajoute au moins une photo et une phrase de ton choix'
    }).show()
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Geoffroy meme Generator</h1>
        <p className="legend">
          <em>Pensez à ne pas baisser la barre</em>
        </p>
      </div>
      <div className="interactive-panel">
        <div className="result">
          {selectedImg !== null ? (
            <Result
              topSentence={topSentence}
              bottomSentence={bottomSentence}
              selectedImg={selectedImg}
            />
          ) : (
            <h3>1) Choisissez une image</h3>
          )}
        </div>
        <Sentence
          topSentence={topSentence}
          setTopSentence={setTopSentence}
          bottomSentence={bottomSentence}
          setBottomSentence={setBottomSentence}
          handlesubmit={handlesubmit}
          selectedImg={selectedImg}
          missField={missField}
        />
        <div className="base-pics-app">
          {basePics &&
            basePics.map((pic) => {
              return (
                <Pics
                  name={pic.name}
                  url={pic.url}
                  setSelectedImg={setSelectedImg}
                  selectedImg={selectedImg}
                />
              );
            })}
        </div>
      </div>
      <div className="list">
        {listMeme.reduce((a, b, i) => {
          const item = listMeme[listMeme.length - i - 1];
          const picture = basePics.find((pic) => item.base_pics_id === pic.id);
          a.push(
            <Result
              topSentence={item.txt1}
              bottomSentence={item.txt2}
              selectedImg={picture && picture.url}
            />
          );
          return a;
        }, [])}
      </div>
    </div>
  );
}

export default App;
