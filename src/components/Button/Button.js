import React from "react";
import cx from "classnames";

import { ReactComponent as Spinner } from "../../svg/spinner.svg";
import "./Button.scss";

/**
 * Possible 'design's include:
 *  - default: a regular button
 *  - plain: looks like a link
 *  - toggle: used for a toggle button
 *  - small: smaller buttons resembling plain
 */
const Button = ({
    isDisabled = false,
    isLoading = false,
    selected = false,
    icon = null,
    count = null,
    children,
    type = "button",
    design = "default",
    color = "primary",
    onClick = () => {},
    ...props
}) => {
    return (
        <button
            disabled={isDisabled}
            onClick={onClick}
            type={type}
            className={cx("button", `button--style-${design}`, `button--color-${color}`, {
                'button--selected': selected,
                'button--disabled': isDisabled,
                'button--loading': isLoading,
            })}
            {...props}
        >
            {icon}
            <span>{children}</span>
            { isLoading && (
                <div className="button__loader">
                    <Spinner />
                </div>
            )}
            {count !== null && (
                <span className="button__count">
                    {` (${count})`}
                </span>
            )}
        </button>
    );
};

Button.Group = ({ children }) => (
    <div className="button-group">
        {children}
    </div>
);

export default Button;
