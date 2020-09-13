import React from "react";

import { hash } from "../../utils/string";
import "./PlaceholderAvatar.scss";

const PlaceholderAvatar = ({ name }) => {
    const initials = name.substring(0, 2).toUpperCase();
    const hue = hash(name) & 0xFF;

    return (
        <div className="placeholder-avatar" style={{
            background: `hsl(${hue}, 32%, 91%)`,
            color: `hsl(${hue}, 15%, 52%)`,
        }}>
            {initials}
        </div>
    );
};

export default PlaceholderAvatar;
