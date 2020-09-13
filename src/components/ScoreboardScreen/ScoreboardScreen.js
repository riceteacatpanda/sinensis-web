import React from "react";
import cx from "classnames";

import PlayScreen from "../PlayScreen/PlayScreen";
import "./ScoreboardScreen.scss";

const ScoreboardScreen = ({ className, ...props }) => (
    <PlayScreen className={cx("scoreboard-screen", className)} {...props}/>
);

export default ScoreboardScreen;
