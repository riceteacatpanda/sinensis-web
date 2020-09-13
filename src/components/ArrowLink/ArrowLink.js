import React from "react";

import cx from "classnames";

import NavLink from "../NavLink";
import "./ArrowLink.scss";

const ArrowLink = ({ className, ...props }) => (
    <NavLink
        className={cx("arrow-link", className)}
        {...props} />
);

export default ArrowLink;
