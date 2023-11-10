export const DEFAULT_BREAK_LENGTH = 5 * 60 ;
export const DEFAULT_SESSION_LENGTH = 25 * 60; 
export const MIN_TIME = 60;
export const MAX_TIME = 60 * 60;
export const INTERVAL = 60;
export interface DisplayState {
    time: number,
    timeType: "Session" | "Break",
    timeRunning: boolean, 
}
