import React, { memo, useState, useRef, useMemo, useCallback } from "react";

import Chart from "../Chart/Chart";

import "./ScoreGraph.scss";

const ScoreGraph = ({ solves: unorderedSolves, chartProps = {} }) => {
    const currentTime = useRef(+new Date());

    const solves = useMemo(() => ([{
        key: 0,
        value: unorderedSolves
            .concat({ points: 0, time: currentTime.current })
            .sort((a, b) => a.time - b.time)
    }]), [unorderedSolves]);

    const cummulativeScores = useMemo(
        () => solves[0].value.map((sum => value => sum += value.points)(0)),
    [solves]);

    const xStock = useCallback(d => new Date(d.time), []);
    const yStock = useCallback(d => cummulativeScores[solves[0].value.indexOf(d)], [cummulativeScores, solves]);
    const keyStock = useCallback(d => d.id, []);

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [datapoint, setDatapoint] = useState(null);

    const setTooltip = useCallback((value) => {
        if (value) {
            setShowTooltip(true);
            setTooltipPos({ x: value.plot.x, y: value.plot.y });
            setDatapoint(yStock(value.data[0]));
        } else {
            setShowTooltip(false);
        }
    }, [yStock]);

    return (
        <div className="score-graph">
            <Chart
                {...chartProps}
                data={solves}
                xStock={xStock}
                yStock={yStock}
                setTooltip={setTooltip}
                keyStock={keyStock} />
            <div className="score-graph__tooltip"
                style={{
                    display: showTooltip ? 'block' : 'none',
                    left: tooltipPos.x,
                    top: tooltipPos.y
                }}>
                <span className="score-graph__tooltip__value">{datapoint}</span>
                <span className="score-graph__tooltip__label"> points</span>
            </div>
        </div>
    );
};

export default memo(ScoreGraph);
