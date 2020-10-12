import React, {Component} from 'react';
import styles from './Player.module.css';
import soundFile from './synth.wav';
import loop from './loop.flac'
import rain from './rain-01.mp3'
import arrow from '../../assets/arrowSVG.svg'
import logo from '../../assets/LOGO.svg'
import menuIcon from '../../assets/arrowSVGpink.svg'

class Player extends Component {
  state = {
    value: '',
    affirmations: [],
    affirmation1: '',
    affirmation2: '',
    affirmation3: '',
    affirmation4: '',
    affirmation5: '',
    lengthOfTime: 0,
    playing: false,
    track: null, 
    step: 3
  }


  componentDidMount() {
    this.setState({
      step: 1
    })
    console.log(this.state.step)
  }


  clearAffirmationsList = () => {
    this.setState({affirmations: []})
  }

  onChangeAffirmation1 = e => {
    this.setState({affirmation1: e.target.value})
  }

  onChangeAffirmation2 = e => {
    this.setState({affirmation2: e.target.value})
  }

  onChangeAffirmation3 = e => {
    this.setState({affirmation3: e.target.value})
  }

  onChangeAffirmation4 = e => {
    this.setState({affirmation4: e.target.value})
  }

  onChangeAffirmation5 = e => {
    this.setState({affirmation5: e.target.value})
  }



  // handleAffirmationChange = (e) => {
  //   this.setState({
  //     affirmation: e.target.value, 
  //   })
  // }


  onAddAffirmation = () =>  {
    this.setState( state => {
      const affirmations = state.affirmations.concat(
              state.affirmation1, 
              state.affirmation2, 
              state.affirmation3, 
              state.affirmation4, 
              state.affirmation5);

        state.step = 2;

      return {
        affirmations,
        value: ''
      };
    });
};

  addAllAffirmations = () => {
    if(this.state.affirmation1 !== '') {
      this.onAddAffirmation(this.state.affirmation1);
    }
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


  goToStepThree = () => {
    this.setState({
      step: 3
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

  goBack1Step = (currentStep) => {
   if(currentStep === 3) {
    this.setState({
      step: 2
    })
   } else if(currentStep === 2) {
     this.setState({
       step: 1
     })
   }
  }

  goToNextStep = (currentStep) => {
    if(currentStep === 1) {
      this.setState({
        step: 2
      })
    } else if(currentStep === 2) {
      this.setState({
        step: 3
      })
    }
  }

    
  render() {
     
    let  attachedStyles = [ styles.modalDiv, styles.modalHide ]; 
    if (this.state.playing === true) {
      attachedStyles = [styles.modalDiv, styles.modalShow]
    }

    let step1Styles = [styles.step1Show, styles.step2Hide, styles.step3Hide];
    if(this.state.step === 1) {
      step1Styles = [styles.step1Show]
    } else if (this.state.step !== 1) {
      step1Styles = [styles.step1Hide]
    } 

    let step2Styles = [styles.step1Show, styles.step2Hide, styles.step3Hide];
    if(this.state.step === 2) {
      step2Styles = [styles.step2Show]
    } else if (this.state.step !== 2) {
      step2Styles = [styles.step2Hide]
    } 

    let step3Styles = [styles.step1Show, styles.step2Hide, styles.step3Hide];
    if(this.state.step === 3) {
      step3Styles = [styles.step3Show]
    } else if (this.state.step !== 3) {
      step3Styles = [styles.step3Hide]
    } 

    let arrowStyles = [styles.arrowContainer]
    if (this.state.step === 3) {
      arrowStyles = [styles.arrowHide]
    }



    return(
      <div className={styles.Container}>
        <div className={styles.menuBar}>
          <div>
            <img className={styles.menuIcon} src={menuIcon} alt="" 
              onClick={() => this.goBack1Step(this.state.step)}
            />
          </div>   
          <img className={styles.menuLogo} src={logo} alt=""/>
          </div>
      <div className ={styles.playerContainer}>
        {/* <textarea className ={styles.formElement} placeholder="Type your affirmation"
          onChange={this.handleAffirmationChange}
        >
        </textarea> */}

        <div className={step1Styles.join(' ')}>  
          <div className={styles.stepTxt}>Type your affirmations below:</div>
            <div className={styles.inputContainer}>
              <div className={styles.inputNumDiv}>1</div>
              <input 
                className={styles.input}
                type="text" 
                value={this.state.affirmation1} 
                onChange={this.onChangeAffirmation1}
                placeholder="AFFIRMATION"
                />
              </div>
              <div className={styles.inputContainer}>
              <div className={styles.inputNumDiv}>2</div>
              <input 
                className={styles.input}
                type="text" 
                value={this.state.affirmation2} 
                onChange={this.onChangeAffirmation2}
                placeholder="AFFIRMATION"
                />
              </div>
              <div className={styles.inputContainer}>
              <div className={styles.inputNumDiv}>3</div>
              <input 
                className={styles.input}
                type="text" 
                value={this.state.affirmation3} 
                onChange={this.onChangeAffirmation3}
                placeholder="AFFIRMATION"
                />
              </div>
              <div className={styles.inputContainer}>
              <div className={styles.inputNumDiv}>4</div>
              <input 
                className={styles.input}
                type="text" 
                value={this.state.affirmation4} 
                onChange={this.onChangeAffirmation4}
                placeholder="AFFIRMATION"
                />
              </div>
              <div className={styles.inputContainer}>
              <div className={styles.inputNumDiv}>5</div>
              <input 
                className={styles.input}
                type="text" 
                value={this.state.affirmation5} 
                onChange={this.onChangeAffirmation5}
                placeholder="AFFIRMATION"
                />
              </div>
        </div>    
        {/* <ul>
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
        </button> */}


        <div className={step2Styles.join(' ')} >

          <label className={styles.stepTxt}>Choose your background music</label>
          <div className={styles.inputContainer}>
          <select className={styles.input} onChange={this.handleTrackChange}>
          <option defaultValue value="null"> -- Choose a track -- </option>
            <option value={soundFile}>track 1</option>
            <option value={loop}>track 2</option>
            <option value={rain}>track 3</option>
          </select>
          </div>
        </div>

        <div className={step3Styles.join(' ')}>
          <label className ={styles.stepTxt} >How Long Do You Want to Re-program your subconcious</label>
          <div className={styles.inputContainer}>
          <select className ={styles.input} onChange={this.handleTimeChange}>]
            <option defaultValue value="null"> -- Select a time -- </option>
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
          </div>
          <div className={styles.startBtnContainer}>
        <button className ={styles.btn} onClick={() =>this.newAffirm(this.state.affirmations)}>BEGIN</button>
        </div>
        </div >

        <div className={attachedStyles.join(' ')} onClick={this.closeModal} />
      </div>
        <div className={arrowStyles.join(' ')}>
      <div className={styles.menuArrow}><img src={arrow} alt="" onClick={() =>this.goToNextStep(this.state.step)}/></div>
      </div>
      </div>

    )
  }
}

export default Player;