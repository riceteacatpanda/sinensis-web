import React, { memo, useRef, useMemo, useEffect } from "react";
import ResizeObserver from 'resize-observer-polyfill';

import { bisector, extent, max } from 'd3-array';
import { scaleTime, scaleLinear, scaleOrdinal } from 'd3-scale';
import { area, line, curveMonotoneX } from 'd3-shape';
import { select, mouse } from 'd3-selection';
import { getYfromX, linearGradient } from '../../utils/d3';

import "./Chart.scss";

const TOOLTIP_BOUNDING = { top: 8, height: 12, bottom: 15, left: 10, right: 10 };
const TOOLTIP_SPACING = { vertical: TOOLTIP_BOUNDING.top + TOOLTIP_BOUNDING.height + TOOLTIP_BOUNDING.bottom };

const Chart = ({
    data,
    xStock,
    yStock,
    keyStock,

    setTooltip = null,
    overrideMargins = {},
    hideAxis = false,
    hideGrid = false,
    hideDots = false,
    colors = ["#623AA2", "#F97794"],
}) => {
    const margin = useMemo(() => ({
        top: 0,
        left: 60,
        bottom: 0,
        right: 10,
        ...overrideMargins
    }), [overrideMargins]);

    const wrapperRef = useRef();
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        function draw() {
            svg.selectAll("*").remove();
            const { width, height } = svgRef.current.getBoundingClientRect();

            const xMax = width - (margin.left + margin.right);
            const yMax = height - (margin.top + margin.bottom + (setTooltip ? TOOLTIP_SPACING.vertical : 0));

            const allData = data.flatMap(d => d.value)

            const xScale = scaleTime()
                .domain(extent(allData, xStock))
                .range([0, xMax]);

            const yScale = scaleLinear()
                .domain([0, max(allData, yStock)])
                .range([yMax, 0])
                .nice();

            const colorScale = scaleOrdinal(colors);

            const plot = line()
                .x(d => xScale(xStock(d)))
                .y(d => yScale(yStock(d)))
                .curve(curveMonotoneX);

            const areaPlot = area()
                .x(d => xScale(xStock(d)))
                .y0(yScale(0))
                .y1(d => yScale(yStock(d)))
                .curve(curveMonotoneX);

            // Do graphing
            const graph = svg.append('g')
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Create each plot
            const plotInstance = graph.selectAll('g')
                .data(data)
                .join("g");

            // Area Plot Gradient
            plotInstance
                .call(linearGradient, d => `grad-${d.key}`, {
                    fromColor: d => colorScale(d.key),
                    fromOpacity: 0.1,
                    toColor: d => colorScale(d.key),
                    toOpacity: 0
                });

            // Area Plot
            plotInstance.append("path")
                .attr("fill", d => `url(#grad-${d.key})`)
                .attr("d", d => areaPlot(d.value));

            // Line Plot
            const linePlot = plotInstance.append("path")
                .attr("stroke", d => colorScale(d.key))
                .attr("stroke-width", 3)
                .attr("stroke-linecap", "round")
                .attr("fill", "none")
                .attr("d", d => plot(d.value));

            // Tooltip
            const tooltip = svg.append("g")
                .attr("visibility", "hidden");

            const tooltipLine = tooltip.append("line")
                .attr("class", "chart__tooltip__line")
                .attr("y0", 0)
                .attr("y1", height - TOOLTIP_SPACING.vertical);

            const tooltipDot = tooltip.append("circle")
                .attr("class", "chart__tooltip__dot")
                .attr("r", 5);

            const tooltipText = tooltip.append("text")
                .attr("text-anchor", "middle")
                .attr("y", height - TOOLTIP_BOUNDING.bottom)
                .attr("class", "chart__tooltip__text")
                .attr("font-size", `${TOOLTIP_BOUNDING.height}px`)

            function hideTooltip() {
                tooltip.attr("visibility", "hidden");
                setTooltip(null);
            }

            const dateBisect = bisector(xStock).left;
            function moveTooltip() {
                tooltip.attr("visibility", "visible");

                const [mouseX, mouseY] = mouse(this);
                // eslint-disable-next-line
                const [x, y] = [mouseX - margin.left, mouseY - margin.top];
                const plotY = getYfromX(linePlot.node(), x) + margin.top;

                const interpolatedDate = xScale.invert(x);

                setTooltip({
                    plot: { x: mouseX, y: plotY },
                    data: data.map(dataSet => dataSet.value[dateBisect(dataSet.value, interpolatedDate)])
                });

                tooltipText
                    .attr("x", mouseX)
                    .text(interpolatedDate.toLocaleDateString());

                const textBBBox = tooltipText.node().getBBox();
                const textLeft = textBBBox.x;
                const textRight = width - (textBBBox.x + textBBBox.width);

                if (textLeft <= TOOLTIP_BOUNDING.left) {
                    tooltipText
                        .attr("x", mouseX + (TOOLTIP_BOUNDING.left - textLeft))
                }

                if (textRight <= TOOLTIP_BOUNDING.right) {
                    tooltipText
                        .attr("x", mouseX - (TOOLTIP_BOUNDING.right - textRight))
                }

                tooltipDot
                    .attr("cx", mouseX)
                    .attr("cy", plotY);

                tooltipLine
                    .attr("x1", mouseX)
                    .attr("x2", mouseX);
            }

            // Tooltip hover listener
            if (setTooltip) {
                svg.append("rect")
                    .attr("x", margin.left)
                    .attr("y", margin.top)
                    .attr("width", xMax)
                    .attr("height", yMax)
                    .attr("fill", "none")
                    .attr("pointer-events", "all")
                    .on("mouseout", hideTooltip)
                    .on("mousemove", moveTooltip)
            }
        }

        draw();

        let animationFrame = null;
        const observer = new ResizeObserver(() => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => {
                draw();
            });
        });

        observer.observe(wrapperRef.current);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            observer.disconnect();
        };
    }, [data, margin, setTooltip, xStock, yStock, colors]);

    return (
        <div className="graph__wrapper" ref={wrapperRef}>
            <svg className="graph" ref={svgRef} />
        </div>
    );
};

export default memo(Chart);
