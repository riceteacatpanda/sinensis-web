import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { CancelToken } from "axios";

export function useQueuedState(startValue) {
    const [state, setState] = useState(startValue);
    const [queuedState, setQueuedState] = useState(null);

    function clearQueue() {
        if (queuedState) {
            clearTimeout(queuedState);
        }
    }

    function updateState(newValue, queuedFunction, delay) {
        clearQueue();
        setState(newValue);

        if (typeof queuedFunction !== 'undefined') {
            if (typeof queuedFunction === 'function') {
                setQueuedState(setTimeout(queuedFunction, delay));
            } else {
                setQueuedState(setTimeout(() => {
                    setState(queuedFunction)
                }, delay));
            }
        }
    }

    // Cleanup queue to avoid invalid state
    // eslint-disable-next-line
    useEffect(() => clearQueue, []);

    return [state, updateState];
}

export function useTimeout() {
    const timeouts = useRef([]);

    useEffect(() => () => {
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
    }, []);

    const timeoutHandler = useCallback((fn, delay = 0) => {
        let timeout = setTimeout(() => {
            timeouts.current.splice(timeouts.current.indexOf(timeout), 1);
            fn();
        }, delay);

        timeouts.current.push(timeout);
    }, []);

    return timeoutHandler;
}

export function useInterval() {
    const intervals = useRef([]);

    useEffect(() => () => {
        for (let i = 0; i < intervals.length; i++) {
            clearInterval(intervals[i]);
        }
    }, []);

    const intervalHandler = useCallback((fn, delay = 0) => {
        let isRemoved = false;
        let interval;

        function remove() {
            if (!isRemoved) {
                clearInterval(interval);
                intervals.current.splice(intervals.current.indexOf(interval), 1);
                isRemoved = true;
            }
        }

        interval = setInterval(() => {
            fn();
        }, delay);

        intervals.current.push(interval);

        return remove;
    }, []);

    return intervalHandler;
}


export function useRequestContext() {
    const cancelToken = useMemo(() => CancelToken.source(), []);

    const context = useCallback({ cancelToken: cancelToken.token }, []);

    function cancel() {
        cancelToken.cancel()
    }

    // eslint-disable-next-line
    useEffect(() => cancel, []);

    return { context, cancel };
}
