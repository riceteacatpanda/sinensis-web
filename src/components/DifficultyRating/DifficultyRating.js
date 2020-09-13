import React, { memo } from "react";

import AnnotatedLabel from "../AnnotatedLabel/AnnotatedLabel";
import "./DifficultyRating.scss";

const difficultyLevels = [
    { name: "Trivial", color: "#63B3ED" },
    { name: "Easy", color: "#48BB78" },
    { name: "Medium", color: "#ED8936" },
    { name: "Difficult", color: "#E53E3E" },
    { name: "Very Difficult", color: "#805AD5" },
];

const DifficultyRating = ({ rating }) => {
    const level = difficultyLevels[rating];

    return (
        <AnnotatedLabel
            color={level.color}
            icon={rating > 0 && Array(rating).fill().map((_, i) => (
                <span
                    className="difficulty-rating__dot"
                    key={i}></span>
            ))}>
            { level.name }
        </AnnotatedLabel>
    );
};

export default memo(DifficultyRating);
