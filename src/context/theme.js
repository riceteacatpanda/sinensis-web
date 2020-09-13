import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

const THEME_STORAGE_KEY = 'prefer-theme';
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const preferredTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (preferredTheme) {
            return preferredTheme;
        } else {
            const uaDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return uaDark ? 'dark' : 'light';
        }
    });

    useEffect(() => {
        const changeAutoTheme = e => {
            const preferredTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (!preferredTheme) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addListener(changeAutoTheme)

        return () => media.removeListener(changeAutoTheme);
    }, []);

    useEffect(() => {
        for (const className of document.body.classList) {
            if (className.startsWith('theme-')) {
                document.body.classList.remove(className);
            }
        }
        document.body.classList.add(`theme-${theme}`);
    }, [theme]);

    const userSetTheme = useCallback((theme) => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        setTheme(theme);
    }, [setTheme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme: userSetTheme }}>
            { children }
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
