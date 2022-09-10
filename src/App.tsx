import React from "react";
import './index.css';
import {Routes, Route} from "react-router-dom";
import Game from "./Game";
import Ranking from "./Ranking";

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-09-10
 */
const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Game/>}/>
            <Route path="/minesweeper" element={<Ranking/>}/>
        </Routes>
    );
};

export default App;