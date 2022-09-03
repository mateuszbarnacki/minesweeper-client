import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {faBomb} from "@fortawesome/free-solid-svg-icons";

interface SquareProps {
    fieldNumber?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    styleClass?: string;
}

const Square: React.FC<SquareProps> = ({fieldNumber, onClick, styleClass}: SquareProps) => {
    let buttonText: any = styleClass === 'hidden' || styleClass === 'zeroStyle' ? ' ' : fieldNumber;
    buttonText = fieldNumber === 'X' ? <i><FontAwesomeIcon icon={faBomb} /></i> : buttonText;
    return (
        <button onClick={onClick} className={styleClass}>
            {buttonText}
        </button>
    );
}

export default Square;