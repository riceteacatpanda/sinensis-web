import React, { memo, useCallback } from "react";
import cx from "classnames";

import { navigate } from "@reach/router";
import { useCTF } from "../../context/ctf";
import { useTheme } from "../../context/theme";
import { useAuth } from "../../context/auth";
import { useAPI } from "../../api/API";
import { logout } from "../../api/user";
import NavLink from "../NavLink";
import { ReactComponent as Logo } from "../../svg/logo.svg";
import { ReactComponent as Scoreboard } from "../../svg/scoreboard.svg";
import { ReactComponent as Home } from "../../svg/home.svg";
import { ReactComponent as Gavel } from "../../svg/gavel.svg";
import { ReactComponent as Challenges } from "../../svg/challenges.svg";
import { ReactComponent as Sun } from "../../svg/sun.svg";
import { ReactComponent as Moon } from "../../svg/moon.svg";
import { ReactComponent as Logout } from "../../svg/logout.svg";
import "./Sidebar.scss";

const SidebarItem = ({ icon, name, shortcut, isActive, className }) => (
    <div className={cx("sidebar-item", className, {
        "sidebar-item--active": isActive
    })}>
        <div className="sidebar-item__active"/>
        <div className="sidebar-item__content">
            <span className="sidebar-item__icon">{ icon }</span>
            <span className="sidebar-item__name">{ name }</span>
            { shortcut && <span className="sidebar-item__shortcut">{shortcut}</span>}
        </div>
    </div>
);

const SidebarLink = ({ to: link, ...props }) => (
    <NavLink to={link} exact={false} className="sidebar-item__link">
        {(isActive) => <SidebarItem {...props} isActive={isActive} />}
    </NavLink>
);

const SidebarButton = ({ onClick, ...props }) => (
    <button className="sidebar-item__button" onClick={onClick}>
        <SidebarItem {...props} />
    </button>
);

const SidebarSection = ({ title, children }) => (
    <div className="sidebar__section">
        {title && <h2 className="sidebar__section__title">{title}</h2>}
        <div>
            {children}
        </div>
    </div>
);

const Sidebar = ({ isDropdown = false }) => {
    const { ctf } = useCTF();
    const { theme, setTheme } = useTheme();
    const { api } = useAPI();
    const { loadUser } = useAuth();

    const toggleTheme = useCallback(() => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [theme, setTheme]);

    const logoutUser = useCallback(() => {
        async function logoutAndNavigate() {
            await logout(api);
            navigate('/auth');
            await loadUser();
        }

        logoutAndNavigate();
    }, [api, loadUser]);

    return (
        <div className={cx("sidebar", {
            "sidebar__dropdown": isDropdown
        })}>
            <div className="sidebar__context">
                <div className="sidebar__context__logo">
                    <Logo />
                </div>
                <div className="sidebar__context__details">
                    <h1 className="sidebar__context__title">{ ctf.name }</h1>
                    <span className="sidebar__context__subtitle">All about shoobs.</span>
                </div>
            </div>

            <SidebarSection>
                <SidebarLink
                    // shortcut="⌘1"
                    name="Home"
                    icon={<Home />}
                    to="/play/home" />
                <SidebarLink
                    // shortcut="⌘2"
                    name="Challenges"
                    icon={<Challenges />}
                    to="/play/challenges" />
                <SidebarLink
                    // shortcut="⌘3"
                    name="Scoreboard"
                    icon={<Scoreboard />}
                    to="/play/scoreboard" />
                <SidebarLink
                    // shortcut="⌘4"
                    name="Rules"
                    icon={<Gavel />}
                    to="/play/rules" />
            </SidebarSection>

            <SidebarSection title="Settings">
                <SidebarButton
                    onClick={toggleTheme}
                    icon={theme === 'dark' ? <Moon /> : <Sun />}
                    name="Toggle Theme" />
            </SidebarSection>

            <SidebarSection title="Account">
                <SidebarButton
                    onClick={logoutUser}
                    icon={<Logout />}
                    name="Logout" />
            </SidebarSection>
        </div>
    )
};

export default memo(Sidebar);
