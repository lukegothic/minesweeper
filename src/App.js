import React, { Component } from 'react';
import './App.css';
import Settings from './Settings';
import Game from './Game';
import End from './End';

//9x9 10mines
const scenes = {
  SETTINGS: 0,
  GAME: 1
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: scenes.SETTINGS,
      settings: {
        "w": 4,
        "h": 4,
        "mines": 2
      },
      winner: null
    }
  }
  handleEndSettings = (settings) => {
    this.setState({
      scene: scenes.GAME,
      settings: settings
    });
  }
  handleEndGame = (isWinner) => {
    this.setState({
      winner: isWinner
    });
  }
  render() {
    return (<div>
      {(this.state.winner !== null) && <End isWinner={this.state.winner} />}
      {(this.state.scene === scenes.SETTINGS) ? <Settings defaultSettings={this.state.settings} onEndSettings={this.handleEndSettings} /> : <Game settings={this.state.settings} onEndGame={this.handleEndGame} />}
    </div>)
  }
}

export default App;
