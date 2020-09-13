import React, { useMemo } from "react";

import Card from "../Card/Card";
import ScoreGraph from "../ScoreGraph/ScoreGraph";

import { useCTF } from "../../context/ctf";
import "./ProgressCard.scss";

const ProgressStat = ({ stat, value }) => (
    <div className="progress-stat">
        <div className="progress-stat__value">{ value.toLocaleString() }</div>
        <div className="progress-stat__stat">{ stat }</div>
    </div>
);

const ProgressCard = ({ team }) => {
    const { ctf } = useCTF();
    const totalSolves = team.solves.length;
    const percentSolved = Math.floor(totalSolves / ctf.totalChallenges * 100);

    const chartProps = useMemo(() => ({
        hideAxis: true,
        hideGrid: true,
        hideDots: true,
        colors: ["white"],
        opacity: [],
        overrideMargins: { top: 8, left: -3, right: 3, bottom: 0 }
    }), []);

    return (
        <Card className="progress__card">
            <div className="progress">
                <div className="progress__primary">
                    <div className="progress__points">
                        <span className="progress__points-value">{team.points.toLocaleString()}</span>
                        <span className="progress__points-label"> points</span>
                    </div>
                    <div className="progress__graph">
                        <ScoreGraph
                            solves={team.solves}
                            chartProps={chartProps}/>
                    </div>
                </div>
                <div className="progress__stats">
                    <ProgressStat
                        value={`${percentSolved}%`}
                        stat="Pecent Solved"/>
                    <ProgressStat
                        value={totalSolves}
                        stat="Total Solves"/>
                    <ProgressStat
                        value={`69`}
                        stat="Please Laugh"/>
                </div>
            </div>
        </Card>
    )
};

export default ProgressCard;
