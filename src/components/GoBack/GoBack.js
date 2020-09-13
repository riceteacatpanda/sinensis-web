import React from "react";
import { useNavigate } from "@reach/router";

import "./GoBack.scss";

const GoBack = ({
    text = "← Go Back",
    target = -1
}) => {
    const navigate = useNavigate();

    return (
        <div className="go-back__wrapper">
            <button className="go-back" onClick={e => navigate(target)}>
                <span>{text}</span>
            </button>
        </div>
    );
};

export default GoBack;
