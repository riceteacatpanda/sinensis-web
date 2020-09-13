import React from "react";

import Splash from "../Splash/Splash";
import "./ErrorSplash.scss";

const ErrorSplash = ({ icon, title, children, returnLink }) => (
    <Splash>
        <div className="error-splash">
            <div className="error-splash__icon">{ icon }</div>
            <div>
                <h2 className="error-splash__title">{ title }</h2>
                <div className="error-splash__description">{ children }</div>
                { returnLink }
            </div>
        </div>
    </Splash>
);

export default ErrorSplash;
