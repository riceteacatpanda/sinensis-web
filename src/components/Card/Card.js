import React from "react";
import cx from "classnames";

import "./Card.scss";

const Card = ({
    className,
    shadow = 'regular',
    active,
    children
}) => {
    return (
        <div className={cx("card", {
            'card--active': active,
            'card--shadow-small': shadow === 'small'
        }, className)}>
            {children}
        </div>
    );
};

Card.Section = ({ children }) => {
    return (
        <div className="card__section">
            { children }
        </div>
    )
};

export default Card;
