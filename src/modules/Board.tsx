import React from 'react';
import Square from './Square';
import '../index.css';
import {Field} from "./Game";

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-08-31
 */
interface BoardProps {
    width?: number;
    height?: number;
    board?: Field[]
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Board: React.FC<BoardProps> =  (props) => {
    const generateRow = (y:number) => {
        let row: any[] = [];
        for (let x = 0; x < props.width; x++) {
            const idx = y * props.height + x;
            const fieldNumber = Number.isNaN(props.board[idx].value) ? '' : props.board[idx].value + '';
            const currentStyle = props.board[idx].style;
            row = row.concat(<Square onClick={props.onClick} styleClass={currentStyle} fieldNumber={fieldNumber} index={''+idx}/>);
        }
        return (
            <div className={"row"}>
                {row}
            </div>
        );
    }

    const generateBoard = () => {
        let array: any[] = [];
        for (let y = 0; y < props.height; y++) {
            array = array.concat(generateRow(y));
        }
        return array;
    }

    return (
        <div>
            {generateBoard()}
        </div>
    );
}

export default Board;