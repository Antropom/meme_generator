import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Pics from './components/Pics';

function App() {
  const [basePics, setBasePics] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/pics`)
      .then((res) => setBasePics(res.data));
  }, []);

  return (
    <div className="App">
      {basePics &&
        basePics.map((pic) => {
          return <Pics name={pic.name} url={pic.url} />;
        })}
    </div>
  );
}

export default App;
