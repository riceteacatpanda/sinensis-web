import React, { memo, useState, useEffect } from "react";
import { globalHistory } from "@reach/router";
import cx from "classnames";
import { motion, AnimatePresence } from 'framer-motion';

import { ReactComponent as Logo } from "../../svg/logo.svg";
import Sidebar from "../Sidebar/Sidebar";
import CTFTimer from "../CTFTimer/CTFTimer";

import "./Header.scss";

const dropdownVariants = {
    initial: {
        opacity: 0.3,
        y: '-100%'
    },
    dropdown: {
        opacity: 1,
        y: '0',
        scale: 1
    },
    exit: {
        opacity: 0.5,
        y: '-100%'
    }
};

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const historyUnsubscribe = globalHistory.listen(() => {
            setIsNavOpen(false);
        });

        return () => {
            historyUnsubscribe();
        };
    }, []);

    return (
        <header className="header">
            <div className="header__content">
                <div className="hamburger">
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        aria-label="Open Navigation Menu"
                        className={cx("hamburger__box", {
                            "hamburger__box--open": isNavOpen
                        })}>
                        <span className="hamburger__part hamburger__part--top"></span>
                        <span className="hamburger__part hamburger__part--middle"></span>
                        <span className="hamburger__part hamburger__part--bottom"></span>
                    </button>
                </div>
                <span className="header__icon">
                    <Logo />
                </span>
                <span className="header__timer">
                    <CTFTimer small />
                </span>
            </div>
            <AnimatePresence>
                {isNavOpen && (
                    <motion.div
                        key="dropdown"
                        variants={dropdownVariants}
                        initial="initial"
                        animate="dropdown"
                        exit="exit"
                        transition={{ damping: 50, stiffness: 200 }}
                        className="header__dropdown">
                        <Sidebar isDropdown />
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
};

export default memo(Header);
