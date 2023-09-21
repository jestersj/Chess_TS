import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell,
    selected: boolean
    click: (cell: Cell) => void
}
const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div
            className={['cell', cell.color, selected ? 'selected' : '',
                cell.figure && cell.available ? 'available_for_attack' : ''
            ].join(' ')}
            onClick={() => click(cell)}
        >
            {
                cell.available && !cell.figure &&
                <div className={'available'}></div>
            }
            {
                cell.figure?.logo &&
                <img src={cell.figure.logo} alt={cell.figure.name}/>
            }
        </div>
    );
};

export default CellComponent;