import React from "react";
import cx from "classnames";

import GoBack from "../GoBack/GoBack";
import CTFTimer from "../CTFTimer/CTFTimer";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import "./PlayScreen.scss";

const PlayScreen = ({
    title,
    returnButton,
    className,
    children
}) => (
    <div className={cx("play-screen", className)}>
        <div className="play-screen__header">
            <div className="play-screen__header__titles">
                { returnButton && <GoBack /> }
                <h2 className="play-screen__title">{ title }</h2>
            </div>
            <div className="play-screen__header__time">
                <CTFTimer />
            </div>
        </div>
        <ErrorBoundry>
            { children }
        </ErrorBoundry>
    </div>
);

export default PlayScreen;
