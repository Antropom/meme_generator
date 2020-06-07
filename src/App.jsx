import React, { useState, useEffect } from 'react';
import Sentence from './components/Sentence'
import './App.css';
import axios from 'axios';
import Pics from './components/Pics';

function App() {

  const [basePics, setBasePics] = useState(null);
  const [topSentence, setTopSentence] = useState("");
  const [bottomSentence, setBottomSentence] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/pics`)
      .then((res) => setBasePics(res.data));
  }, []);
  return (
    <div className="App">
      <Sentence topSentence={topSentence} setTopSentence={setTopSentence} bottomSentence={bottomSentence} setBottomSentence={setBottomSentence} />
      <div className="base-pics-app">
        {basePics &&
          basePics.map((pic) => {
            return <Pics name={pic.name} url={pic.url} />;
          })}
      </div>
    </div>
  );
}


export default App;
