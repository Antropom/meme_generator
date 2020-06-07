import React, { Component } from 'react';
import Sentence from './components/Sentence'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <Sentence />
      </div>
    );
  }
}

export default App;
