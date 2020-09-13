import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import cx from "classnames";

import { ReactComponent as CrossIcon } from "../../svg/cross.svg";
import "./NotificationView.scss";

const THEME_ICONS = {
    default: "🔔",
    error: "❗",
    announcement: "📣"
};

const NotificationView = ({ notifications, removeNotification }) => {
    return createPortal(
        (
            <div className="notifications">
                <AnimatePresence initial={false}>
                    {notifications.map(({ id, theme = 'default', text }) => (
                        <motion.div
                            layout
                            key={id}
                            initial={{ opacity: 0, y: -50, scale: 0.3 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            className={cx("notification", `notification--theme-${theme}`)}>
                            <div className="notification__icon">
                                {THEME_ICONS[theme] || "❗️"}
                            </div>
                            <div className="notification__content">
                                <p>{text}</p>
                            </div>
                            <div className="notification__config">
                                <button
                                    onClick={() => removeNotification(id)}
                                    title="Close this notification">
                                    <CrossIcon />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        ),
        document.body
    );
};

export default NotificationView;
