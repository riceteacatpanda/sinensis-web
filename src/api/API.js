import { useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

import uniqueId from 'lodash/uniqueId';
import { useNotification } from '../context/notification';
import * as apiConfig from '../config/api';

const NETWORK_ERROR_MESSAGE = `The API could not be reached.`;
const GENERIC_API_ERROR_MESSAGE = `An unknown API error occured.`;
const ERROR_MESSAGES = new Map([
    [400, `A malformed API request was unexpectedly sent.`],
    [403, `You're forbidden from performing that action.`],
    [404, `An API request was unexpectedly sent to a non-existent path.`],
    [429, `You're being rate-limited. Slow down there!`],
    [500, `There was an internal API error.`],
    [502, `The API couldn't respond properly, possibly due to heavy load. Try again at another time.`],
    [503, `The API responded as unavailable, possibly due to heavy load. Try again at another time.`],
    [504, `The API took too long to respond, possibly due to heavy load. Try again at another time.`]
]);

const instance = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        'X-Requested-With': apiConfig.csrfIdentifier
    }
});

// Imperatively returns the API values. Does not handle unmount states etc.
export function getAPI() {
    const api = instance;
    return { api };
}

export function useAPI({
    cancelOnUnmount = true,
    cancelPending = false
} = {}) {
    const cancelToken = useRef(null);
    const { sendNotification } = useNotification();

    const cancel = useCallback((message) => {
        if (cancelToken.current) {
            cancelToken.current.cancel(message);
        }
    }, []);

    const api = useCallback((config) => {
        if (cancelPending) {
            cancel('Component interrupted.');
            cancelToken.current = axios.CancelToken.source();
        } else if (!cancelToken.current) {
            cancelToken.current = axios.CancelToken.source();
        }

        return instance.request({
            ...config,
            cancelToken: cancelToken.current.token
        }).catch((error) => {
            if (axios.isCancel(error)) {
                // Do nothing really...
                throw error;
            } else if (!error.response) {
                sendNotification({
                    id: uniqueId(`error-network-`),
                    theme: 'error',
                    text: NETWORK_ERROR_MESSAGE
                });
            } else if (ERROR_MESSAGES.has(error.response.status)) {
                sendNotification({
                    id: uniqueId(`error-${error.response.status}-`),
                    theme: 'error',
                    text: ERROR_MESSAGES.get(error.response.status)
                });
            } else {
                sendNotification({
                    id: uniqueId(`error-unex-net-`),
                    theme: 'error',
                    text: GENERIC_API_ERROR_MESSAGE
                });
            }

            throw error;
        });
    }, [sendNotification, cancel, cancelPending]);

    useEffect(() => {
        return () => cancelOnUnmount && cancel('Component unmounted.');
    }, [cancelOnUnmount, cancel]);

    return { api, cancel };
}
