import React from "react";

import "./InputGroup.scss";

const InputGroup = ({ label, id, children }) => (
    <div className="input-group">
        <label htmlFor={id}>{ label }</label>
        { children }
    </div>
);

export default InputGroup;
