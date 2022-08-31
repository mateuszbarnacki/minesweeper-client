import React from "react";

interface SquareProps {
    fieldNumber?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    styleClass?: string;
}

const Square: React.FC<SquareProps> = ({fieldNumber, onClick, styleClass}: SquareProps) => {
    return (
        <button onClick={onClick} className={styleClass}>
            {fieldNumber}
        </button>
    );
}

export default Square;