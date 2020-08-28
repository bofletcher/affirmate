import React, { Component } from 'react'
import styles from './Login.module.css'
import logo from '../../assets/LOGO.svg'

class Login extends Component {

  render(){
    return(
      <div className={styles.loginContainer}>
        <img className={styles.logo} src={logo} alt=""/>
        <button onClick={this.props.click} className={styles.loginBtn}>
          Enter
        </button>
      </div>
    )
  }
}

export default Login;