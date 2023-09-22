import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
}
const TimerComponent: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [whiteTime, setWhiteTime] = useState(300)
    const [blackTime, setBlackTime] = useState(300)

    const timerRef = useRef<null | ReturnType<typeof setInterval>>(null)

    const startTime = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTime : decrementBlackTime
        timerRef.current = setInterval(callback, 1000)
    }
    const decrementWhiteTime = () => {
        setWhiteTime(prevState => prevState-1)
    }
    const decrementBlackTime = () => {
        setBlackTime(prevState => prevState-1)
    }
    const handleRestart = () => {
        setBlackTime(300)
        setWhiteTime(300)
        restart()
    }
    useEffect(() => {
        startTime()
    }, [currentPlayer])
    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart Game</button>
            </div>
            <h3>Белые - {whiteTime}</h3>
            <h3>Черные - {blackTime}</h3>
        </div>
    );
};

export default TimerComponent;