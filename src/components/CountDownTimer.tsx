import { FaPause, FaPlay, FaUndo } from "react-icons/fa";
import { DisplayState } from "../helper"

interface Timer {
    displayState: DisplayState,
    startStopTimer: () => void,
    reset : () => void,
}

export const CountDownTimer: React.FC<Timer> = ({displayState, startStopTimer, reset}) => {

    const timeFormat = (time: number) : string => {
         const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${seconds < 10 ? "0" + seconds.toString() : seconds}`;
    }

    return(
        <div className="display">
            <h4 id="timer-label" style={{fontSize: '30px'}}>{displayState.timeType}</h4>
            <span id="time-left">{timeFormat(displayState.time)}</span>
            <div>
                <button id="start_stop" onClick={() => startStopTimer()}>
                    {displayState.timeRunning ? <FaPause /> : <FaPlay /> }
                </button>
                <button id="reset" onClick={reset}>
                    <FaUndo /> 
                </button>
            </div>
        </div>
    )   
}