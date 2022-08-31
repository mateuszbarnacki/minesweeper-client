import React, {useState} from 'react';
import Board from './Board';
import './index.css';

const Game: React.FC = () => {
    const width: number = 8;
    const height: number = 8;
    const numberOfBombs: number = 10;
    const [board, setBoard] = useState(Array.from({length: height},
        () => Array.from({length: width}, () => ({value: '0', wasClicked: false}))));

    const handleChange = (row: number, column: number, newValue: string, newWasClicked: boolean) => {
        let copy = [...board];
        copy[row][column].value = newValue;
        copy[row][column].wasClicked = newWasClicked;
        setBoard(copy);
    }

    const handleClick = (row: number, column: number) => {
        let copy: any[][] = [...board];
        copy[row][column].wasClicked = true;
        setBoard(copy);
    };

    const prepareBoard = () => {
        let x: number;
        let y: number;
        let counter: number = 0;
        while (counter < numberOfBombs) {
            x = Math.random() * 100 % width;
            y = Math.random() * 100 % height;
            if (board[x][y].value === '0') {
                handleChange(y, x, 'X', false);
                counter++;
            }
        }
    };

    const calculateTips = () => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (board[y][x].value !== 'X') {
                    handleChange(y, x, '' + getNumberOfBombs(x, y), false);
                }
            }
        }
    };

    const getNumberOfBombs = (x: number, y: number) => {
        let counter: number = 0;
        let lowerX: number = 1;
        let lowerY: number = 1;
        let upperX: number = 1;
        let upperY: number = 1;
        if (x === 0) {
            lowerX = 0;
        }
        if (y === 0) {
            lowerY = 0;
        }
        if (x === (width - 1)) {
            upperX = 0;
        }
        if (y === (height - 1)) {
            upperY = 0;
        }
        for (let i = (y - lowerY); i <= (y + upperY); i++) {
            for (let j = (x - lowerX); j <= (x + upperX); j++) {
                if (board[i][j].value === 'X') {
                    counter++;
                }
            }
        }
        return counter;
    }

    prepareBoard();
    calculateTips();
    return (
        <Board width={width} height={height} board={board} onClick={e => handleClick}/>
    );
}

export default Game;