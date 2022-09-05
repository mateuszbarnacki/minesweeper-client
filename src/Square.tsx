import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {faBomb} from "@fortawesome/free-solid-svg-icons";

interface SquareProps {
    fieldNumber?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    styleClass?: string;
    index?: string;
}

const Square: React.FC<SquareProps> = ({fieldNumber, onClick, styleClass, index}: SquareProps) => {
    let buttonText: any = styleClass === 'hidden' || styleClass === 'zeroStyle' ? ' ' : fieldNumber;
    buttonText = styleClass === 'win' || styleClass === 'lose' ? <i><FontAwesomeIcon icon={faBomb} /></i> : buttonText;
    return (
        <button onClick={onClick} id={index} className={styleClass}>
            {buttonText}
        </button>
    );
}

export default Square;