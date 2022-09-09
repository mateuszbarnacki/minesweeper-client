import React, {useState} from 'react';
import {MinesweeperDto} from "./api/apiModels";

interface ModalProps {
    toggle?: boolean;
    result?: number;
}

const Modal: React.FC<ModalProps> = (props) => {
    const [name, setName] = useState('');
    const handleClick: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const resultToSave: MinesweeperDto = {userName: name, time: props.result};
        console.log(resultToSave);
    };

    return (
        <div className={props.toggle ? "modal-active" : "modal"}>
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

export default Modal;