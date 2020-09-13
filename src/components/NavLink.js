import React from "react";
import { Link } from "@reach/router";
import cx from "classnames";

const NavLink = ({ className, activeClassName, exact = true, children, ...props }) => (
    <Link
        {...props}
        getProps={({ isCurrent, isPartiallyCurrent }) => ({
            className: cx(className, {
                [activeClassName]: activeClassName && (exact ? isCurrent : isPartiallyCurrent)
            }),
            children: typeof children === 'function' ? children(exact ? isCurrent : isPartiallyCurrent) : children
        })}
    />
);

export default NavLink;
