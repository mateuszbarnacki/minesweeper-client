import React, {useEffect, useState} from 'react';
import AppBar from "./AppBar";
import {mapSeconds} from "./Timer";
import {MinesweeperDto} from "../api/apiModels";
import * as P from "../api/paths";
import {localStorageAuthToken} from "../api/constants";

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-09-09
 */
const Ranking: React.FC = () => {
    const [gameResults, setGameResults] = useState<MinesweeperDto[]>([]);

    useEffect(() => {
        fetch(P.base + P.minesweeper,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken)
                }
            }).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Server problem: " + response.status);
                }
        }).then((json) => {
            setGameResults(json);
        }).catch(error => {
            console.error(error);
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