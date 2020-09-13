import React, { memo, useState } from "react";
import sample from 'lodash/sample';

import "./Greeting.scss";

const PLAYER_GREETINGS = {
    morning: [
        'Howdy, ',
        'Welcome, ',
        'Good morning, ',
    ],
    afternoon: [
        'Howdy, ',
        'Welcome, ',
        'Good afternoon, ',
    ],
    evening: [
        'Howdy, ',
        'Welcome, ',
        'Good evening, '
    ],
    night: [
        'Howdy, ',
        'Welcome, ',
        'Good night, '
    ]
};

const Greeting = memo(({ user }) => {
    const [greeting] = useState(() => {
        const currentTime = new Date().getHours();
        const time = 5 < currentTime && currentTime < 12 ? 'morning' :
            12 <= currentTime <= 5 ? 'afternoon' :
            5 < currentTime < 9 ? 'evening' : 'night';
        return sample(PLAYER_GREETINGS[time])
    });

    return (
        <span className="greeting">
            <span className="greeting__label">{greeting}</span>
            <span className="greeting__name">{user.username}</span>
        </span>
    );
});

export default Greeting;
