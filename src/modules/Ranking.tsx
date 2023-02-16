import React, {useEffect, useState} from 'react';
import AppBar from "./AppBar";
import {mapSeconds} from "./Timer";
import {useSelector} from "react-redux";
import {getMinesweeperResults} from "../store/minesweeper/selectors";
import {MinesweeperDto} from "../api/apiModels";

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-09-09
 */
const Ranking: React.FC = () => {
    const results = useSelector(getMinesweeperResults);
    const [gameResults, setGameResults] = useState<MinesweeperDto[]>([]);

    useEffect(() => {
        if (results) {
            setGameResults(results);
        }
    }, [results]);

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