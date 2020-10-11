import React, { Component } from 'react';
import './App.css';
import Player from './components/Player/Player'
import Login from './components/Login/Login'


class App extends Component {
  state = {
    loggedIn: false,

  }

  loginHandler() {
    this.setState({
      loggedIn: true
    })
  }

  

  render() {
  
  let WholeApp;
  if (this.state.loggedIn) {
    WholeApp = <Player />
  } else {
    WholeApp = <Login click={() => this.loginHandler()} />
  }
  
  return (
    <div className="appContainer">
      {WholeApp}
    </div>
  );
  }
}

export default App;
