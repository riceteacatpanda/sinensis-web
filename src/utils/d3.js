export function linearGradient(parent, id, { fromColor, fromOpacity, toColor, toOpacity }) {
    const gradient = parent.append("linearGradient")
        .attr("id", id)
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%");

    gradient.append('stop')
        .attr("offset", "0%")
        .attr("stop-color", fromColor)
        .attr("stop-opacity", fromOpacity);

    gradient.append("stop")
       .attr("offset", "100%")
       .attr("stop-color", toColor)
       .attr("stop-opacity", toOpacity);
}

export function close(valueA, valueB, threshold) {
    return Math.abs(valueA - valueB) < threshold;
}

// Gets y coordinate on path (x, y) where y is a function of x
export function getYfromX(path, x, threshold = 0.001) {
    let left = 0;
    let right = path.getTotalLength();
    while (true) {
        const target = (left + right) / 2;
        const point = path.getPointAtLength(target);
        if (close(point.x, x, threshold) || close(target, left, threshold) || close(target, right, threshold)) {
            return point.y;
        } else if (point.x > x) {
            right = target;
        } else {
            left = target;
        }
    }
}
