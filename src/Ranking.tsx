import React, {useEffect, useState} from 'react';
import * as P from './api/paths';
import AppBar from "./AppBar";

const Ranking: React.FC = () => {
    const [gameResults, setGameResults] = useState([]);

    useEffect(() => {
        fetch(P.baseURL + P.minesweeper)
            .then(response => response.json())
            .then((result) => {
                setGameResults(result);
            });
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
                        <td>gameResult.userName</td>
                        <td>gameResult.time</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranking;