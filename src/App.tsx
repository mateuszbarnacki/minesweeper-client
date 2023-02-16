import React, {useEffect} from "react";
import './index.css';
import {Routes, Route} from "react-router-dom";
import Game from "./modules/Game";
import Ranking from "./modules/Ranking";
import Form from "./modules/Form";
import {useDispatch} from "react-redux";
import {getMinesweeperResultsRequest} from "./store/minesweeper/actions";

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-09-10
 */
const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMinesweeperResultsRequest());
    }, [dispatch])

    return (
        <Routes>
            <Route path="/" element={<Form/>}/>
            <Route path="/game" element={<Game/>}/>
            <Route path="/minesweeper" element={<Ranking/>}/>
        </Routes>
    );
};

export default App;