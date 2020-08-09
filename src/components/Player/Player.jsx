import React, {Component} from 'react';
import styles from './Player.module.css';
import soundFile from './synth.wav';

class Player extends Component {
  state = {
    affirmations: [],
    affirmation: '',
    lengthOfTime: 0,
    backgroundAudioPlaying: false
  }

  audio = new Audio(soundFile)
  

  handleAffirmationChange = (e) => {
    this.setState({
      affirmation: e.target.value, 
    })
  }

  handleTimeChange = (e) => {
    this.setState({
      lengthOfTime: e.target.value,
    })
  }


  affirm(affirmation) {
    this.voices = window.speechSynthesis.getVoices()
    if(this.voices.onvoiceschanged !== undefined) {
      this.voices.onvoiceschanged = window.speechSynthesis.getVoices;
    }
    this.affirmationVoice = new SpeechSynthesisUtterance(affirmation)
    this.affirmationVoice.rate = 0.5
    this.affirmationVoice.pitch = 0.3
    
    // repeat with the interval of 3 seconds
    let repeater = setInterval(() =>  {
      window.speechSynthesis.speak(this.affirmationVoice)
    }, 7000);

    // after 5 seconds stop and stop background audio
    setTimeout(() => { 
      clearInterval(repeater); 
      alert('stop'); 
      this.audio.pause()
    }, this.state.lengthOfTime);

    this.audio.play()
    this.audio.loop = true;
    this.audio.volume = 0.7;
  }
    
  render() {
    
    return(
      
      <div className ={styles.playerContainer}>
        <textarea placeholder="Type your affirmation"
          onChange={this.handleAffirmationChange}
        >
        </textarea>
          <label htmlFor="">How Long Do You Want to Re-program your subconcious</label>
          <select onChange={this.handleTimeChange} name="" id="">]
            <option value="20000">20 Seconds</option>
            <option value="300000">5 Minutes</option>
            <option value="600000">10 Minutes</option>
            <option value="900000">15 Minutes</option>
            <option value="1.2e+6">20 Minutes</option>
            <option value="1.5e+6">25 Minutes</option>
            <option value="1.8e+6">30 Minutes</option>
            <option value="2.1e+6">35 Minutes</option>
            <option value="2.4e+6">40 Minutes</option>
            <option value="2.7e+6">45 Minutes</option>
            <option value="3e+6">50 Minutes</option>
            <option value="3.3e+6">55 Minutes</option>
            <option value="3.6e+6">1 Hour</option>
          </select>
        <button onClick={() =>this.affirm(this.state.affirmation)}>AFFIRM</button>
      </div>

    )
  }
}

export default Player;