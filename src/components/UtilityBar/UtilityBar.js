import React from "react";
import cx from "classnames";

import "./UtilityBar.scss";

const UtilityBar = ({ children }) => (
    <div className="utility-bar">
        {children}
    </div>
);

UtilityBar.Item = ({
    isAside = false,
    isSmall = false,
    icon = null,
    name,
    children
}) => (
    <div className={cx("utility-item", {
        'utility-item--aside': isAside,
        'utility-item--small': isSmall,
    })}>
        <div className="utility-item__title">
            {icon}
            <span>{name}</span>
        </div>
        <div className="utility-item__contents">
            {children}
        </div>
    </div>
);

export default UtilityBar;
