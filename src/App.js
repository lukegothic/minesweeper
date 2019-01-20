import React, { Component } from 'react';
import './App.css';
import Settings from './Settings';
import Game from './Game';

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
        "w": 9,
        "h": 9,
        "mines": 10
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
  render() {
    return (<div>
      {(this.state.scene === scenes.SETTINGS) ? <Settings defaultSettings={this.state.settings} onEndSettings={this.handleEndSettings} /> : <Game settings={this.state.settings} />}
    </div>)
  }
}

export default App;
