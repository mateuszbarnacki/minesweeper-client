import React from 'react';
import Square from './Square';
import './index.css';

interface BoardProps {
    width?: number;
    height?: number;
    board?: any[][];
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Board: React.FC<BoardProps> =  (props) => {
    const generateRow = (y:number) => {
        let row: any[] = [];
        for (let x = 0; x < props.width; x++) {
            const fieldNumber = Number.isNaN(props.board[y][x].value) ? '' : props.board[y][x].value + '';
            row = row.concat(<Square onClick={props.onClick} styleClass="hidden" fieldNumber={fieldNumber}/>);
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