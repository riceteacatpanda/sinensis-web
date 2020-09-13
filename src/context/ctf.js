import React, { useState, useEffect, createContext, useContext } from 'react';
import moment from 'moment';

import { getCtfInfo } from "../api/ctf";
import { useAPI } from "../api/API";

const CTFContext = createContext();

export function CTFProvider({ children }) {
    const [ctf, setCtf] = useState(null);
    const [isOver, setIsOver] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { api } = useAPI();

    useEffect(() => {
        let cancelCTFOver;

        getCtfInfo(api)
            .then(ctf => {
                setCtf(ctf);
                const timeUntilEnd = moment().diff(ctf.endTime);
                if (timeUntilEnd > 0) {
                    setIsOver(false);
                    cancelCTFOver = setTimeout(() => {
                        setIsOver(true);
                    }, timeUntilEnd);
                } else {
                    setIsOver(true);
                }
                setIsLoading(false);
            });

        return () => {
            if (typeof cancelCTFOver !== 'undefined') {
                clearTimeout(cancelCTFOver);
            }
        };
    }, [api]);

    return (
        <CTFContext.Provider value={{ ctf, isOver, isLoading }}>
            { children }
        </CTFContext.Provider>
    );
}

export const useCTF = () => useContext(CTFContext);
