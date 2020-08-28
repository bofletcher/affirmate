import React, { Component } from 'react';
import './App.css';
import Main from './components/Main/Main'
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
    WholeApp = <Main />
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
