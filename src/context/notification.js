import React, { useState, useCallback, createContext, useContext } from 'react';

import NotificationView from "../components/NotificationView/NotificationView";
import { useTimeout } from "../utils/hooks";

const NotificationContext = createContext();

const MAX_NOTIFS = 5;
const NOTIFICATION_TIME = 8000;

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const timeout = useTimeout();

    const removeNotification = useCallback((id) => {
        setNotifications(
            existingNotifs =>
                existingNotifs.filter(
                    n => n.id !== id));
    }, []);

    const sendNotification = useCallback(({ id, theme, text }) => {
        const newNotif = {
            id: id,
            theme: theme,
            text: text
        };

        setNotifications(existingNotifs => [newNotif, ...existingNotifs.slice(0, MAX_NOTIFS - 1)]);
        timeout(() => removeNotification(id), NOTIFICATION_TIME);
    }, [removeNotification, timeout]);

    window.sendNotification = sendNotification;


    return (
        <>
            <NotificationView
                notifications={notifications}
                removeNotification={removeNotification} />
            <NotificationContext.Provider value={{ sendNotification, removeNotification }}>
                { children }
            </NotificationContext.Provider>
        </>
    );
}

export const useNotification = () => useContext(NotificationContext);
