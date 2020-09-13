import React from "react";
import cx from "classnames";

import "./Dashboard.scss";

const Dashboard = ({ children }) => {
    return (
        <div className="dashboard">
            { children }
        </div>
    )
};

Dashboard.Node = ({
    title,
    icon = null,
    wide = false,
    tall = false,
    full = false,
    children
}) => {
    return (
        <div className={cx("dn", {
            "dn--size-wide": wide,
            "dn--size-tall": tall,
            "dn--size-full": full,
        })}>
            <h3 className="dn__title">{icon}<span>{title}</span></h3>
            <div className="dn__content">{children}</div>
        </div>
    );
};

export default Dashboard;
