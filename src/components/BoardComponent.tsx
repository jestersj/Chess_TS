import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";


interface BoardProps {
    board: Board
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayers: () => void
}
const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayers}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    
    const clickCell = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayers()
            setSelectedCell(null)
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }
    }
    const highlightCell = () => {
        board.highlightCells(selectedCell)
        updateBoard()
    }
    
    const updateBoard = () => {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }
    useEffect(() => {
        highlightCell()
    }, [selectedCell])
    return (
        <div className={'board'}>
            {
                board.cells.map((row, ind) =>
                    <React.Fragment key={ind}>
                        {row.map(cell =>
                            <CellComponent cell={cell} key={cell.id}
                                           selected={selectedCell?.x === cell.x && selectedCell?.y === cell.y}
                                           click={clickCell}
                            />
                        )}
                    </React.Fragment>
                )
            }
        </div>
    );
};

export default BoardComponent;