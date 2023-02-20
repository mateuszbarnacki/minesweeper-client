import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faBomb} from "@fortawesome/free-solid-svg-icons";
import {localStorageAuthToken} from "../api/constants";
import '../index.css';

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-09-08
 */
const AppBar: React.FC = () => {
    const logoutUser = () => {
        window.localStorage.removeItem(localStorageAuthToken);
    }

    return (
        <div className="header">
            <div className="nav">
                <ol>
                    <li><i><FontAwesomeIcon icon={faBars}/></i>
                        <ul>
                            <li><a href="/game">Game</a></li>
                            <li><a href="/minesweeper">Ranking</a></li>
                            <li><a href="/" onClick={logoutUser}>Logout</a></li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div className="mainTitle">
                <h2>
                    <i className="header-icon"><FontAwesomeIcon icon={faBomb}/></i>
                    Minesweeper
                    <i className="header-icon"><FontAwesomeIcon icon={faBomb}/></i>
                </h2>
            </div>
        </div>
    );
};

export default AppBar;