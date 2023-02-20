import React, {useEffect, useState} from 'react';
import {MinesweeperDto} from "../api/apiModels";
import * as P from '../api/paths';
import {localStorageAuthToken} from "../api/constants";

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-09-09
 */
interface ResultFormProps {
    toggle?: boolean;
    result?: number;
    onSubmit?: Function;
}

const ResultForm: React.FC<ResultFormProps> = (props) => {
    const [name, setName] = useState('');
    const [formState, setFormState] = useState(false);
    const handleClick: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const resultToSave: MinesweeperDto = {userName: name, time: props.result};
        fetch(P.base + P.minesweeper,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken)
                },
                body: JSON.stringify(resultToSave)
            }
        ).then((response) => {
            if (response.status !== 201) {
                throw new Error("Server problem: " + response.status);
            }
        }).then(
            () => setFormState(false)
        ).then(
            () => props.onSubmit(e)
        );
    };

    useEffect(() => {
        setFormState(props.toggle);
    }, [props.toggle]);

    return (
        <div className={formState ? "modal-active" : "modal"}>
            <form>
                <input
                    type="text"
                    id="userName"
                    placeholder="Name"
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = "Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <br/>
                <input type="submit" value="Submit" onClick={handleClick}/>
            </form>
        </div>
    )
};

export default ResultForm;