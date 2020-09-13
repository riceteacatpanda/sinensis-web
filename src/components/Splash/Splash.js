import React from "react";

import "./Splash.scss";

const Splash = ({ children }) => (
    <div className="splash">
        <div className="splash__content">
            { children }
        </div>
    </div>
);

export default Splash;
