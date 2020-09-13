import React from "react";

import "./AnnotatedLabel.scss";

const AnnotatedLabel = ({ icon, color, children }) => (
    <span className="annotated-label" style={{ color: color }}>
        {icon && <span className="annotated-label__image">{ icon }</span>}
        <span className="annotated-label__name">{ children }</span>
    </span>
);

export default AnnotatedLabel;
