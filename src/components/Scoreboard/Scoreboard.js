import React, { memo, useMemo } from "react";
import cx from "classnames";
import { AutoSizer, List } from "react-virtualized";

import { useAuth } from "../../context/auth";
import Card from "../Card/Card";
import NavLink from "../NavLink";
import { ReactComponent as TrophyIcon } from "../../svg/trophy.svg";
import "./Scoreboard.scss";

const ScoreboardRow = ({
    className,
    rank,
    name,
    points,
    ...props
}) => {
    return (
        <div className={cx("scoreboard__row", className)} {...props}>
            <div className="scoreboard__cell scoreboard__rank">{ rank }</div>
            <div className="scoreboard__cell scoreboard__name">{ name }</div>
            <div className="scoreboard__cell scoreboard__points">{ points }</div>
        </div>
    );
};

const trophyColors = [
    '#D69E2E',
    '#718096',
    '#C05621'
];

const ScoreboardEntry = memo(({ score, isCurrentTeam, ...props }) => {
    let name = <span>{score.name}</span>;
    const rankColor = trophyColors[score.rank - 1];

    if (score.rank <= trophyColors.length) {
        name = (
            <span className="scoreboard__trophy">
                <TrophyIcon style={{ fill: rankColor }}/>
                {name}
            </span>
        );
    }

    const rank = (
        `${score.rank}.`
    );

    return (
        <NavLink
            to={`/play/teams/${score.id}`}
            className="scoreboard__active"
            {...props}>
            <ScoreboardRow
                className="scoreboard__entry"
                rank={rank}
                name={name}
                points={score.score} />
        </NavLink>
    );
});

const Scoreboard = ({ scores, filter }) => {
    const filteredScores = useMemo(
        () => scores.filter(
            (score) => score.name.toLocaleLowerCase().includes(filter.toLowerCase())),
    [scores, filter]);

    const currentUser = useAuth();
    const currentTeam = currentUser.team;

    function renderEntry({ key, index, style }) {
        const score = filteredScores[index];
        return (
            <ScoreboardEntry
                key={key}
                score={score}
                style={style}
                isCurrentTeam={currentTeam?.id === score.id} />
        );
    }

    return (
        <Card className="scoreboard">
            <ScoreboardRow
                className="scoreboard__header"
                rank="Rank"
                name="Team"
                points="Points" />
            <div className="scoreboard__scores">
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            width={width}
                            rowHeight={60}
                            rowCount={filteredScores.length}
                            rowRenderer={renderEntry}/>
                    )}
                </AutoSizer>
            </div>
        </Card>
    );
};

export default Scoreboard;
