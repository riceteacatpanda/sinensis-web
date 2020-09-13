import React from "react";

import NavLink from "../NavLink";

import "./NewChallengeCard.scss";

const NewChallengeCard = ({ ...props }) => (
    <NavLink
        to={`/play/challenges/new`}
        className="create-card"
        {...props}>
        yes
    </NavLink>
);

export default NewChallengeCard;
