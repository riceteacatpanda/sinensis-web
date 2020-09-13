import React, { useState } from "react";

import { randomChoice } from "../../utils/array";

import error1 from './error1.png';
import error2 from './error2.png';
import error3 from './error3.png';

import "./PageError.scss";

const spinners = [error1, error2, error3];

const PageError = ({ delay = 80 }) => {
    const [errorIcon] = useState(() => randomChoice(spinners));

    return (
        <div className="page-error">
            <img src={errorIcon} alt="Spinning cat" />
            <span className="page-error__label">Uh-oh! An error occured.</span>
        </div>
    );
};

export default PageError;
