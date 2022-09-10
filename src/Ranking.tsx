import React, {useEffect, useState} from 'react';
import * as P from './api/paths';
import AppBar from "./AppBar";
import {mapSeconds} from "./Timer";

const Ranking: React.FC = () => {
    const [gameResults, setGameResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(P.baseURL + P.minesweeper);
            const result = await response.json();
            setGameResults(result);
        };

        fetchData();
    }, []);

    return (
        <div className="ranking">
            <AppBar/>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Result</th>
                </tr>
                </thead>

                <tbody>
                {gameResults.map((gameResult) => (
                    <tr>
                        <td>{gameResult.userName}</td>
                        <td>{mapSeconds(gameResult.time)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranking;