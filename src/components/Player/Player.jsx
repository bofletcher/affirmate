import React, {Component} from 'react';
import styles from './Player.module.css';
import soundFile from './synth.wav';
import loop from './loop.flac'
import rain from './rain-01.mp3'

class Player extends Component {
  state = {
    value: '',
    affirmations: [],
    affirmation: '',
    lengthOfTime: 0,
    playing: false,
    track: null
  }



  clearAffirmationsList = () => {
    this.setState({affirmations: []})
  }

  onChangeAffirmation = e => {
    this.setState({value: e.target.value})
  }

  onAddAffirmation = () =>  {
    this.setState( state => {
      const affirmations = state.affirmations.concat(state.value);

      return {
        affirmations,
        value: ''
      };
    });
};
  

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

  handleTrackChange = (e) => {
    this.setState({
      track: e.target.value,
    })
  }

  onRemoveAffirmation = (i) => {
      this.setState(state => {
        const affirmations = state.affirmations.filter((item, j) => i !==j);
        return {
          affirmations,
        }
      })
  }


  // affirm(affirmation) {
  //   this.voices = window.speechSynthesis.getVoices()
  //   if(this.voices.onvoiceschanged !== undefined) {
  //     this.voices.onvoiceschanged = window.speechSynthesis.getVoices;
  //   }
  //   this.affirmationVoice = new SpeechSynthesisUtterance(affirmation)
  //   this.affirmationVoice.rate = 0.5
  //   this.affirmationVoice.pitch = 0.3

    
  //   // repeat with the interval of 7 seconds
  //   let repeater = setInterval(() =>  {
  //     window.speechSynthesis.speak(this.affirmationVoice)
  //   }, 7000);

  //   // after user specified amount of time, stop affirmations loop and music 
  //   setTimeout(() => { 
  //     clearInterval(repeater); 
  //     this.audio.pause()
  //   }, this.state.lengthOfTime);

  //   this.audio.play()
  //   this.audio.loop = true;
  //   this.audio.volume = 0.7;
  // }

  closeModal = () => {
    this.setState({
      playing: false,
      //lengthOfTime: 0
    });
    this.audio.pause()
    this.audio.currentTime = 0;
    clearInterval(this.repeater)
  }

  repeater; 

  newAffirm(affirmations) {
      this.audio = new Audio(this.state.track)

      this.repeater = setInterval(() => {
      affirmations.forEach(element => {
        this.voices = window.speechSynthesis.getVoices()
        if(this.voices.onvoiceschanged !== undefined) {
          this.voices.onvoiceschanged = window.speechSynthesis.getVoices;
        }
        this.affirmationVoice = new SpeechSynthesisUtterance(element)
        this.affirmationVoice.rate = 0.5
        this.affirmationVoice.pitch = 0.3
  
        
        window.speechSynthesis.speak(this.affirmationVoice)
  
      });

    }, 25000)

    setTimeout(() => { 
      clearInterval(this.repeater); 
      this.audio.pause()
      this.audio.currentTime = 0;
      this.setState({
        playing: false
      })
    }, this.state.lengthOfTime);

    this.audio.play()
    this.setState({
      playing: true
    })
    this.audio.loop = true;
    this.audio.volume = 0.7;
  }

    
  render() {
     
    let  attachedStyles = [ styles.modalDiv, styles.modalHide ]; 
    if (this.state.playing === true) {
      attachedStyles = [styles.modalDiv, styles.modalShow]
    }
    
    return(
      
      <div className ={styles.playerContainer}>
        {/* <textarea className ={styles.formElement} placeholder="Type your affirmation"
          onChange={this.handleAffirmationChange}
        >
        </textarea> */}

        <input 
          type="text" 
          value={this.state.value} 
          onChange={this.onChangeAffirmation}
          placeholder="Type your affirmation"
          />

        <ul>
          {this.state.affirmations.map((item, index)=> (
            <li key={item}>
              {item}
              <button onClick={() => this.onRemoveAffirmation(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <button onClick={this.onAddAffirmation}>
          Add Affirmation
        </button>
        <button onClick={this.clearAffirmationsList}>
          Reset Affirmations List
        </button>

          <label className={styles.formElement}>Choose your background music</label>
          <select className={styles.formElement} onChange={this.handleTrackChange}>
          <option defaultValue value="null"> -- Choose a track -- </option>
            <option value={soundFile}>track 1</option>
            <option value={loop}>track 2</option>
            <option value={rain}>track 3</option>
          </select>

          <label className ={styles.formElement} >How Long Do You Want to Re-program your subconcious</label>
          <select className ={styles.formElement} onChange={this.handleTimeChange}>]
            <option defaultValue value="null"> -- Enter a time -- </option>
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
        <button className ={styles.formElement} onClick={() =>this.newAffirm(this.state.affirmations)}>BEGIN SUBCONSCIOUS PROGRAMMING</button>
        <div className={attachedStyles.join(' ')} onClick={this.closeModal}>
          CLOSE
        </div>
      </div>

    )
  }
}

export default Player;