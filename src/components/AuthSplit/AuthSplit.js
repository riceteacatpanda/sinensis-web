import React from "react";

import "./AuthSplit.scss";

const AuthSplit = ({ children }) => (
    <div className="auth-split">
        <div className="auth-split__aside"></div>
        <main className="auth-split__content">
            { children }
        </main>
    </div>
);

export default AuthSplit;
