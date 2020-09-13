import React from "react";

import Card from "../Card/Card";

import "./SolveList.scss";

const Solve = ({ solve }) => {
    return (
        <Card className="solve">
            { solve.challengeId }
        </Card>
    );
};

const SolveList = ({ team }) => {
    const solves = team.solves;
    return (
        <div className="solve-list__scroll">
            <div className="solve-list">
                {solves.map((solve) => (
                    <Solve
                        key={`${solve.challengeId}${solve.time}`}
                        solve={solve}/>
                ))}
            </div>
        </div>
    );
};

export default SolveList;
