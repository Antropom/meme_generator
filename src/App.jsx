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
    axios.post(`${process.env.REACT_APP_API_URL}/api/memes`, body).then((res) =>
      new Noty({
        text: 'post effectué',
      }).show()
    );
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Geoffroy meme Generator</h1>
        <p className="legend"><em>Pensez à ne pas baisser la barre</em></p>
      </div>
        <Result
          topSentence={topSentence}
          bottomSentence={bottomSentence}
          selectedImg={selectedImg}
        />
        <Sentence
          topSentence={topSentence}
          setTopSentence={setTopSentence}
          bottomSentence={bottomSentence}
          setBottomSentence={setBottomSentence}
          handlesubmit={handlesubmit}
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
      <List listMeme={listMeme} basePics={basePics} />
    </div>
  );
}

export default App;
