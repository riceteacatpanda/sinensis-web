import React, { memo, useState } from "react";
import cx from "classnames";

import { ReactComponent as Spinner } from "../../svg/spinner.svg";
import InputGroup from "../InputGroup/InputGroup";
import "./BorderInput.scss";

const BorderInput = ({
    isDisabled,
    isLoading,
    type = "text",
    placeholder = "",
    label,
    title = "",
    icon,
    id,
    onChange = () => {},
    value
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <InputGroup id={id} label={label}>
            <div className={cx("border-input", {
                "border-input--icon": !!icon,
                "border-input--focus": isFocused,
            })}>
                {icon && (
                    <div className="border-input__icon">
                        { isLoading ? <Spinner /> : icon }
                    </div>
                )}
                <input
                    id={id}
                    name={id}
                    className="border-input__input"
                    disabled={isDisabled}
                    title={title}
                    type={type}
                    onFocus={e => setIsFocused(true)}
                    onBlur={e => setIsFocused(false)}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    value={value} />
                </div>
        </InputGroup>
    )
};

export default memo(BorderInput);
