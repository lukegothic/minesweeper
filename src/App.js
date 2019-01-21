import React, { Component } from 'react';
import './App.css';
import Settings from './Settings';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleEndSettings = (settings) => {
    this.setState({
      settings: settings
    });
  }
  render() {
    return (<div>
      {this.state.settings ? <Game settings={this.state.settings} /> : <Settings onEndSettings={this.handleEndSettings} /> }
    </div>)
  }
}

export default App;
