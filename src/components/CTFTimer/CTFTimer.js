import React, { useState, useEffect } from "react";
import moment from 'moment';
import cx from "classnames";

import { useCTF } from "../../context/ctf";
import "./CTFTimer.scss";

const CTFTimer = ({ small = false }) => {
    const { ctf } = useCTF();
    const [, setTick] = useState(0);

    useEffect(() => {
        const clock = setInterval(() => {
            setTick(tick => tick + 1);
        }, 1000);
        return () => clearInterval(clock);
    }, []);

    let endTime;
    if (small) {
        const hoursUntilEnd = (ctf.endTime - new Date()) / 36e5;
        if (hoursUntilEnd >= 24) {
            endTime = new Date(ctf.endTime).toLocaleDateString(undefined, { dateStyle: 'short' });
        } else {
            endTime = new Date(ctf.endTime).toLocaleTimeString(undefined, { timeStyle: 'medium' });
        }
    } else {
        endTime = new Date(ctf.endTime).toLocaleString();
    }

    return (
        <div className={cx("countdown", {
            "countdown--small": small
        })}>
            <div>
                <span className="countdown__time">{moment(ctf.endTime).toNow(true)}</span>
                <span className="countdown__label"> remaining</span>
            </div>
            <div className="countdown__abs">
                Ends at {endTime}
            </div>
        </div>
    );
};

export default CTFTimer;
