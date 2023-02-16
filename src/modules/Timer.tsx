import React, {MutableRefObject, useEffect, useState} from 'react';

/**
 * @author Mateusz Barnacki
 * @version 1.0
 * @since 2022-09-06
 */
interface TimerProps {
    seconds?: MutableRefObject<number>;
    countTime?: boolean;
}

export function mapSeconds(secondsCounter: number): string {
    const minutesNumber: number = Math.floor(secondsCounter / 60);
    const seconds: string = (secondsCounter % 60) > 9 ? '' + (secondsCounter % 60) : '0' + (secondsCounter % 60);
    const minutes: string = minutesNumber > 9 ? '' + minutesNumber : '0' + minutesNumber;
    return minutes + ':' + seconds;
}

const Timer: React.FC<TimerProps> = ({seconds, countTime}) => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        if (countTime) {
            const interval = setInterval(() => {
                setTime(Date.now());
                seconds.current++;
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countTime]);

    return (
        <div className="timer">
            <h2>{mapSeconds(seconds.current)}</h2>
        </div>
    );
};

export default Timer;