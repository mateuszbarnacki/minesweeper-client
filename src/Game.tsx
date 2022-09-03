import React, {useRef, useState} from 'react';
import Board from './Board';
import './index.css';

export interface Field {
    value?: string;
    wasClicked?: boolean;
    style?: string;
}

function prepareBoard(board: Field[], height: number, width: number, numberOfBombs: number, setBoard: Function): void {
    let copy: Field[] = [...board];
    let x: number;
    let y: number;
    let counter: number = 0;
    while (counter < numberOfBombs) {
        x = Math.round(Math.random() * 100) % width;
        y = Math.round(Math.random() * 100) % height;
        console.log(x, y);
        const idx = y * height + x;
        if (board[idx].value === '0') {
            copy[idx].value = 'X';
            counter++;
        }
    }
    setBoard(copy);
}

function calculateTips(board: Field[], height: number, width: number, setBoard: Function): void {
    let copy: Field[] = [...board];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = y * height + x;
            if (board[idx].value !== 'X') {
                copy[idx].value = '' + getNumberOfBombs(board, width, height, x, y);
            }
        }
    }
    setBoard(copy);
}

function getNumberOfBombs(board: Field[], width: number, height: number, x: number, y: number): number {
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
            const idx = i * height + j;
            if (board[idx].value === 'X') {
                counter++;
            }
        }
    }
    return counter;
}

function isEnd(board: Field[], numberOfBombs: number): boolean {
    const notClickedFields = board.filter(item => !item.wasClicked).length;
    return notClickedFields === numberOfBombs || notClickedFields === 0;
}

function showBombs(board: Field[], setBoard: Function): void {
    const newBoard: Field[] = board.map(item => {
        if (item.value === 'X') {
            item.style = 'lose';
        }
        return item;
    });
    setBoard(newBoard);
}

function getStartArray(width: number, height: number): Field[] {
    return Array.from({length: width * height}, () => ({
        value: '0',
        wasClicked: false,
        style: 'hidden'
    }));
}

function chooseStyle(value: string): string {
    switch (value) {
        case '0': return 'zeroStyle';
        case '1': return 'oneStyle';
        case '2': return 'twoStyle';
        case '3': return 'threeStyle';
        case '4': return 'fourStyle';
        case '5': return 'fiveStyle';
        case '6': return 'sixStyle';
        case '7': return 'sevenStyle';
        case '8': return 'eightStyle';
        case 'X': return 'bombStyle';
        default: return 'hidden';
    }
}

function checkNeighbours(copy: Field[], currentIdx: number, width: number) {
    const neighbours = [currentIdx - width - 1, currentIdx - width, currentIdx - width + 1,
        currentIdx - 1, currentIdx + 1,
        currentIdx + width - 1, currentIdx + width, currentIdx + width + 1];
    if (!copy[currentIdx].wasClicked) {
        copy[currentIdx].wasClicked = true;
        copy[currentIdx].style = chooseStyle(copy[currentIdx].value);
        for (const neighbourIdx of neighbours) {
            if (neighbourIdx >= 0 && neighbourIdx < copy.length) {
                checkNeighbours(copy, neighbourIdx, width);
            }
        }
    }
}

function playAgain(width: number, height: number, setBoard: Function): void {
    setBoard(getStartArray(width, height));
}


const Game: React.FC = () => {
    const width: number = 8;
    const height: number = 8;
    const numberOfBombs: number = 10;
    const [board, setBoard] = useState(getStartArray(width, height));
    const isStart = useRef(true);

    const handleClick = (e: any) => {
        console.log(e);
        /*if (isEnd(board, numberOfBombs)) {
            // no action
        } else if (!board[idx].wasClicked && board[idx].value === 'X') {
            showBombs(board, setBoard);
            let copy: any[] = board.map(item => item.wasClicked = true);
            setBoard(copy);
        } else if (!board[idx].wasClicked) {
            let copy: any[] = [...board];
            checkNeighbours(copy, idx, width);
            if (isEnd(copy, numberOfBombs)) {
                copy.forEach(item => item.wasClicked = true);
            }
            setBoard(copy)
        }*/
    };

    if (isStart.current) {
        prepareBoard(board, height, width, numberOfBombs, setBoard);
        calculateTips(board, height, width, setBoard);
        isStart.current = false;
    }
    return (
        <div className="game-board">
            <Board width={width} height={height} board={board} onClick={handleClick}/>
        </div>
    );
}

export default Game;