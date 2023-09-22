import React, {useEffect, useState} from 'react';
import './styles/App.css'
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFiguresComponent from "./components/LostFiguresComponent";
import TimerComponent from "./components/TimerComponent";

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])
    const swapPlayers = () => {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setCurrentPlayer(whitePlayer)
        setBoard(newBoard)
    }
    return (
        <div className={'app'}>
            <h2>Текущий игрок: {currentPlayer?.color.toUpperCase()}</h2>
            <TimerComponent currentPlayer={currentPlayer} restart={restart}/>
            <div className={'d-flex'}>
                <BoardComponent board={board}
                                setBoard={setBoard}
                                currentPlayer={currentPlayer}
                                swapPlayers={swapPlayers}
                />
                <div>
                    <LostFiguresComponent title={'Черные фигуры'} figures={board.lostBlackFigures}/>
                    <LostFiguresComponent title={'Белые фигуры'} figures={board.lostWhiteFigures}/>
                </div>
            </div>
        </div>
    );
};

export default App;