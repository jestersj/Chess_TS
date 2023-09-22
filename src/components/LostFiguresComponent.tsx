import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFiguresProps {
    title: string
    figures: Figure[]
}
const LostFiguresComponent: FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div className={'lost'}>
            <h3>{title}</h3>
            {
                figures.map(el =>
                    <div key={el.id}>
                        {el.name} {el.logo && <img src={el.logo} width={20} height={20} alt={''}/>}
                    </div>
                )
            }
        </div>
    );
};

export default LostFiguresComponent;