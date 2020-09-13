import React, { useState, useEffect } from "react";

import { randomChoice } from "../../utils/array";

import spinner1 from './spinner1.gif';
import spinner2 from './spinner2.gif';
import spinner3 from './spinner3.gif';
import spinner4 from './spinner4.gif';

import "./PageLoader.scss";

const spinners = [spinner1, spinner2, spinner3, spinner4];

const PageLoader = ({ delay = 80 }) => {
    const [spinnerIcon] = useState(() => randomChoice(spinners));
    const [showSpinner, setShowSpinner] = useState(false);

    // We only want to show the spinner after a certain delay. This is for
    // slightly clearner UX.
    useEffect(() => {
        const spinnerShow = setTimeout(() => {
            setShowSpinner(true);
        }, delay);

        return () => clearTimeout(spinnerShow);
    }, [delay]);

    if (!showSpinner) {
        return <div className="page-loader__blank"></div>
    }

    return (
        <div className="page-loader">
            <img src={spinnerIcon} alt="Spinning cat" />
            <span className="page-loader__label">Loading...</span>
        </div>
    );
};

export default PageLoader;
