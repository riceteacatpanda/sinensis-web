import React from "react";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import "./PlayLayout.scss";

const PlayLayout = ({ children }) => (
    <div className="play dark-theme">
        <Header />
        <Sidebar />
        <main className="play__main">
            <ErrorBoundry>
                { children }
            </ErrorBoundry>
        </main>
    </div>
);

export default PlayLayout;
