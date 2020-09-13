import React from "react";
import { AutoSizer, List } from "react-virtualized";
import moment from "moment";
import cx from "classnames";

import { ReactComponent as Blood } from "../../svg/blood.svg";

import "./SolveTable.scss";

const SolveEntry = ({ rank, solve, style }) => {
    const isFirstBlood = rank === 1;

    return (
        <div className={cx("solve-entry", {
            "solve-entry--even": rank % 2 === 0
        })} style={style}>
            <span className="solve-entry__rank"><span>{`${rank}.`}</span></span>
            <span className="solve-entry__name">{isFirstBlood && <Blood/>} <span>{solve.name}</span></span>
            <span className="solve-entry__time">{moment(solve.time).fromNow()}</span>
        </div>
    );
};

const SolveTable = ({ solves }) => {
    const renderEntry = ({ key, index, style }) => {
        const solve = solves[index];
        return (
            <SolveEntry
                key={key}
                rank={index + 1}
                solve={solve}
                style={style} />
        );
    };

    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
                    height={500}
                    width={width}
                    rowHeight={45}
                    rowCount={solves.length}
                    rowRenderer={renderEntry}/>
            )}
        </AutoSizer>
    );
};

export default SolveTable;
