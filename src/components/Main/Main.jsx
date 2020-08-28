import React from 'react'
import { Component } from 'react';
import logo from '../../assets/LOGO.svg'
import styles from './Main.module.css'
import Player from '../Player/Player'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"


class Main extends Component {

  render() {
    return (
      <Router>
      <div className={styles.main}>
        <div className={styles.menuBar} ><img className={styles.menuLogo} src={logo} alt=""/></div>
        <div className={styles.mainContainer}>
            <Switch>
              <Route path="/" exact component ={Player}/>
            </Switch>
          </div>
      </div>
      </Router>
    )
  }
}

export default Main;