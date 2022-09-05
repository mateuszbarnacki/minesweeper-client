import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
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
    const lowerX: number = x === 0 ? 0 : 1;
    const lowerY: number = y === 0 ? 0 : 1;
    const upperX: number = x === (width - 1) ? 0 : 1;
    const upperY: number = y === (height - 1) ? 0 : 1;
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

function showBombs(board: Field[]): void {
    board.forEach(item => {
        item.wasClicked = true;
        if (item.value === 'X') {
            item.style = 'lose';
        }
        return item;
    });
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
        case '0':
            return 'zeroStyle';
        case '1':
            return 'oneStyle';
        case '2':
            return 'twoStyle';
        case '3':
            return 'threeStyle';
        case '4':
            return 'fourStyle';
        case '5':
            return 'fiveStyle';
        case '6':
            return 'sixStyle';
        case '7':
            return 'sevenStyle';
        case '8':
            return 'eightStyle';
        case 'X':
            return 'bombStyle';
        default:
            return 'hidden';
    }
}

function getNeighbourIndexes(x: number, y: number, width: number, height: number): Array<number> {
    let arr: Array<number> = [];
    const lowerX: number = x === 0 ? 0 : 1;
    const lowerY: number = y === 0 ? 0 : 1;
    const upperX: number = x === (width - 1) ? 0 : 1;
    const upperY: number = y === (height - 1) ? 0 : 1;
    for (let i = (y - lowerY); i <= (y + upperY); i++) {
        for (let j = (x - lowerX); j <= (x + upperX); j++) {
            const idx = i * height + j;
            arr = arr.concat(idx);
        }
    }
    return arr;
}

function checkNeighbours(copy: Field[], currentIdx: number, height: number, width: number, inDepth: boolean) {
    const x = currentIdx % width;
    const y = Math.floor(currentIdx / height);
    const neighbours: Array<number> = getNeighbourIndexes(x, y, width, height);
    if (!copy[currentIdx].wasClicked) {
        copy[currentIdx].wasClicked = true;
        copy[currentIdx].style = chooseStyle(copy[currentIdx].value);
        for (const neighbourIdx of neighbours) {
            if (neighbourIdx >= 0 && neighbourIdx < copy.length && inDepth) {
                const currentInDepth = copy[neighbourIdx].value === '0';
                checkNeighbours(copy, neighbourIdx, height, width, currentInDepth);
            }
        }
    }
}

function mapSeconds(secondsCounter: number): string {
    const minutesNumber: number = Math.floor(secondsCounter / 60);
    const hoursNumber: number = Math.floor(secondsCounter / 3600);
    const seconds: string = (secondsCounter % 60) > 9 ? '' + (secondsCounter % 60) : '0' + (secondsCounter % 60);
    const minutes: string = minutesNumber > 9 ? '' + minutesNumber : '0' + minutesNumber;
    const hours: string = hoursNumber > 9 ? '' + hoursNumber : '0' + hoursNumber;
    return hours + ':' + minutes + ':' + seconds;
}

function printResult(secondsCounter: number, result: string) : string {
    return result === null ? mapSeconds(secondsCounter) : result;
}

function playAgain(width: number, height: number, setBoard: Function): void {
    setBoard(getStartArray(width, height));
}

const Game: React.FC = () => {
    const width: number = 8;
    const height: number = 8;
    const numberOfBombs: number = 10;
    const [board, setBoard] = useState(getStartArray(width, height));
    const [time, setTime] = useState(Date.now());
    const secondsCounter = useRef(0);
    const result = useRef(null);
    const isStart: MutableRefObject<boolean> = useRef(true);
    const isFirstClick: MutableRefObject<boolean> = useRef(false);
    const countTime: MutableRefObject<boolean> = useRef(true);

    useEffect(() => {
        if (isFirstClick.current) {
            const interval = setInterval(() => {
                setTime(Date.now());
                secondsCounter.current++;
            }, 1000);
            return () => clearInterval(interval);
        }
    });


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isFirstClick.current) {
            isFirstClick.current = true;
        }
        e.preventDefault();
        const button: HTMLButtonElement = e.currentTarget;
        const idx: number = parseInt(button.id, 10);
        if (isEnd(board, numberOfBombs)) {
            console.log("End of the game!");
            console.log(result.current);
            // no action
        } else if (!board[idx].wasClicked && board[idx].value === 'X') {
            console.log('User lose!');
            let copy: any[] = [...board];
            showBombs(copy);
            result.current = mapSeconds(secondsCounter.current);
            setBoard(copy);
        } else if (!board[idx].wasClicked) {
            let copy: any[] = [...board];
            const inDepth = copy[idx].value === '0';
            checkNeighbours(copy, idx, height, width, inDepth);
            if (isEnd(copy, numberOfBombs)) {
                console.log('User win: ' + mapSeconds(secondsCounter.current));
                result.current = mapSeconds(secondsCounter.current);
                copy.forEach(item => item.wasClicked = true);
                copy.forEach(item => {
                    if (item.value === 'X') {
                        item.style = 'win';
                    }
                    return item;
                });
                // possible send data from here
            }
            setBoard(copy);
            countTime.current = false;
        }
    };

    if (isStart.current) {
        prepareBoard(board, height, width, numberOfBombs, setBoard);
        calculateTips(board, height, width, setBoard);
        isStart.current = false;
    }
    return (
        <div className="game-board">
            <h2>{printResult(secondsCounter.current, result.current)}</h2>
            <Board width={width} height={height} board={board} onClick={handleClick}/>
        </div>
    );
}

export default Game;