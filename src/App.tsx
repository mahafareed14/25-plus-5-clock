import { useState, useEffect } from 'react'
import { DisplayState, DEFAULT_BREAK_LENGTH, DEFAULT_SESSION_LENGTH } from './helper';
import { SetTime } from './components/SetTime';
import { CountDownTimer } from './components/CountDownTimer';
import './App.css'
import AlarmSound from './assets/AlarmSound.mp3'

function App() {

  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_LENGTH);
  const [sessionTime, setSessionTime] = useState(DEFAULT_SESSION_LENGTH);
  const [displayState, setDisplayState] = useState<DisplayState>({
      time: sessionTime,
      timeRunning: false,
      timeType: "Session",
    });

  useEffect(() => {
    let timeID: number  = 0;
    if(!displayState.timeRunning) return;
    timeID = window.setInterval(decrementDisplay, 1000)
    return () => {
      window.clearInterval(timeID);
    }
  }, [displayState.timeRunning])

  useEffect(() => {
    if(displayState.time === 0)
    { 
      const audio = document.getElementById('beep') as HTMLAudioElement 
      audio.currentTime = 2;
      audio.play().catch(e => console.log(e));
      setDisplayState((state) => ({
        ...state,
        timeType: state.timeType == 'Session' ? 'Break' : 'Session',
        time: state.timeType == 'Session' ? breakTime : sessionTime,
      }));
    }
  },[breakTime, displayState, sessionTime])

  const startStopTimer = (): void  => {
    setDisplayState((state) => ({
      ...state,
      timeRunning: !state.timeRunning,
    }));
  }

  const decrementDisplay = () : void => {
    setDisplayState((state) => ({
      ...state,
      time: state.time - 1,
    }));
  }

  const reset = () => {
    setDisplayState({
      time: DEFAULT_SESSION_LENGTH,
      timeRunning: false,
      timeType: "Session",
    });
    setSessionTime(DEFAULT_SESSION_LENGTH);
    setBreakTime(DEFAULT_BREAK_LENGTH);
    const audio = document.getElementById('beep') as HTMLAudioElement
    audio.pause();
    audio.currentTime = 0;
  }

  const changeBreakTime = (time : number) => {
    if(displayState.timeRunning) return;
    setBreakTime(time);
  }

  const changeSessionTime = (time: number) => {
    if(displayState.timeRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: 'Session',
      timeRunning: false,
    })
  }

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div className="setters">
        <div className="break">
          <h3 id="break-label">Break Length</h3>
          <SetTime time={breakTime} setTime={changeBreakTime} type="break" />
        </div>
        <div className="session">
            <h3 id="session-label">Session Length</h3>
            <SetTime time={sessionTime} setTime={changeSessionTime} type="session" />
        </div>
      </div >
      <CountDownTimer displayState={displayState} startStopTimer={startStopTimer} reset={reset} />
      <audio id="beep" src= {AlarmSound}/>
    </div>
  )
}

export default App
