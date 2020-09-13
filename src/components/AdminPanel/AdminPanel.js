import React from "react";
import cx from "classnames";

import "./AdminPanel.scss";

const AdminPanel = ({ className, children }) => (
    <div className={cx(className, "admin-panel")}>
        { children }
    </div>
);

export default AdminPanel;
