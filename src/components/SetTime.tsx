import { MIN_TIME, MAX_TIME, INTERVAL } from '../helper'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
interface SetTimeProps {
    time: number,
    setTime: (time: number) => void,
    type: "break" | "session",
}



export const SetTime: React.FC<SetTimeProps>  = ({ time, setTime, type}) => {
    return (
        <div>
            <button onClick={() => time > MIN_TIME ? setTime(time - INTERVAL) : null} 
            id={`${type}-decrement`}> 
                <FaArrowDown />
            </button>
            <span id={`${type}-length`}>{time / 60}</span>
            <button onClick={() => time < MAX_TIME ? setTime(time + INTERVAL) : null} 
            id={`${type}-increment`}>
                <FaArrowUp />
            </button>
        </div>
    )

}