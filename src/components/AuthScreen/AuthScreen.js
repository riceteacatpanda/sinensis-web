import React from "react";

import "./AuthScreen.scss";

const AuthScreen = ({ title, subtitle, children }) => (
    <div className="auth-screen">
        <h1>{ title }</h1>
        {subtitle && (<p className="auth-screen__subtitle">{ subtitle }</p>)}
        <div className="auth-screen__content">
            { children }
        </div>
    </div>
);

export default AuthScreen;
