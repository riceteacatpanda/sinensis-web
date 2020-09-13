import React from "react";

import NavLink from "./NavLink";
import { ReactComponent as Logo } from "../svg/logo.svg";

const HeaderElement = ({ children }) => (
    <div className="mr-4">
        {children}
    </div>
);

const HeaderLink = ({ ...props }) => (
    <HeaderElement>
        <NavLink
            className="text-lg font-medium text-gray-600 transition duration-150 hover:text-gray-800"
            activeClassName="text-gray"
            {...props} />
    </HeaderElement>
);

const Header = () => (
    <header className="bg-white shadow-sm">
        <div className="mx-auto px-6 py-4 max-w-screen-lg flex justify-between">
            <div className="flex items-center">
                <HeaderElement>
                    {/* <Logo className="h-10 p-1" /> */}
                </HeaderElement>
                <HeaderElement>
                    <span className="font-semibold text-2xl">
                        RiceTeaCatPanda CTF
                    </span>
                </HeaderElement>
            </div>
            <div className="flex items-center">
                <HeaderLink to="/">Home</HeaderLink>
                <HeaderLink to="/challenges">Challenges</HeaderLink>
            </div>
        </div>
    </header>
);

export default Header;
