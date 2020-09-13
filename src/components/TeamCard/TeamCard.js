import React from "react";

import Card from "../Card/Card";

import "./TeamCard.scss";

const TeamMember = ({ id, username }) => {
    return (
        <li className="member">
            {username}
        </li>
    );
};

const TeamCard = ({ team }) => {
    return (
        <Card>
            <ul className="members">
                {team.members.map((member => (
                    <TeamMember
                        key={member.memberId}
                        id={member.memberId}
                        username={member.username} />
                )))}
            </ul>
        </Card>
    )
};

export default TeamCard;
