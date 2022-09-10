import React, {MutableRefObject, useRef, useState} from 'react';
import Board from './Board';
import './index.css';
import Timer from './Timer';
import AppBar from "./AppBar";
import ResultForm from "./ResultForm";

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

const Game: React.FC = () => {
    const width: number = 8;
    const height: number = 8;
    const numberOfBombs: number = 10;
    const [board, setBoard] = useState(getStartArray(width, height));
    const [countTime, setCountTime] = useState(false);
    const [modalState, setModalState] = useState(false);
    const secondsCounter: MutableRefObject<number> = useRef(0);
    const isStart: MutableRefObject<boolean> = useRef(true);
    const isFirstClick: MutableRefObject<boolean> = useRef(false);
    const playAgainStyle: MutableRefObject<string> = useRef('playAgainButtonHidden');
    const saveResultStyle: MutableRefObject<string> = useRef('saveResultButtonHidden');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isFirstClick.current) {
            isFirstClick.current = true;
            setCountTime(true);
        }
        e.preventDefault();
        const button: HTMLButtonElement = e.currentTarget;
        const idx: number = parseInt(button.id, 10);
        if (isEnd(board, numberOfBombs)) {
            // no action
        } else if (!board[idx].wasClicked && board[idx].value === 'X') {
            setCountTime(false);
            playAgainStyle.current = 'playAgainButtonVisible';
            let copy: any[] = [...board];
            showBombs(copy);
            setBoard(copy);
        } else if (!board[idx].wasClicked) {
            let copy: any[] = [...board];
            const inDepth = copy[idx].value === '0';
            checkNeighbours(copy, idx, height, width, inDepth);
            if (isEnd(copy, numberOfBombs)) {
                copy.forEach(item => item.wasClicked = true);
                copy.forEach(item => {
                    if (item.value === 'X') {
                        item.style = 'win';
                    }
                    return item;
                });
                saveResultStyle.current = 'saveResultButtonVisible';
                playAgainStyle.current = 'playAgainButtonVisible';
                setCountTime(false);
            }
            setBoard(copy);
        }
    };

    const playAgain: React.MouseEventHandler = () => {
        secondsCounter.current = 0;
        isStart.current = true
        isFirstClick.current = false;
        playAgainStyle.current = 'playAgainButtonHidden';
        saveResultStyle.current = 'saveResultButtonHidden';
        setBoard(getStartArray(width, height));
        setCountTime(false);
        setModalState(false);
    };

    const openModal: React.MouseEventHandler = () => {
        setModalState(!modalState);
    };

    if (isStart.current) {
        prepareBoard(board, height, width, numberOfBombs, setBoard);
        calculateTips(board, height, width, setBoard);
        isStart.current = false;
    }
    return (
        <div className="game-board">
            <AppBar/>
            <Timer seconds={secondsCounter} countTime={countTime}/>
            <Board width={width} height={height} board={board} onClick={handleClick}/>
            <div>
                <button className={playAgainStyle.current} onClick={playAgain}>
                    {"Play again"}
                </button>
            </div>
            <div>
                <button className={saveResultStyle.current} onClick={openModal}>
                    {"Save result"}
                </button>
            </div>
            <ResultForm toggle={modalState} result={secondsCounter.current} onSubmit={playAgain}/>
        </div>
    );
}

export default Game;