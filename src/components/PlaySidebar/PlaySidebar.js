import React from "react";
import { motion } from "framer-motion";

import "./PlaySidebar.scss";

const variants = {
    initial: {
        x: '100%',
        opacity: 0.8
    },
    animate: {
        x: 0,
        opacity: 1
    },
    exit: {
        position: 'absolute',
        x: '100%',
        opacity: 0.5
    }
};

const PlaySidebar = ({ children }) => (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ damping: 50, stiffness: 200 }}
        className="play-sidebar">
        <div className="play-sidebar__content">
            {children}
        </div>
    </motion.div>
);

export default PlaySidebar;
