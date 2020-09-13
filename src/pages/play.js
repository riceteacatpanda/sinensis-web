import React, { lazy, Suspense } from 'react';
import { Router, Redirect, useLocation } from "@reach/router";
import { AnimatePresence } from "framer-motion";

import { useAuth } from "../context/auth";

import PlayLayout from "../components/PlayLayout/PlayLayout";
import PageLoader from "../components/PageLoader/PageLoader";

const Challenges = lazy(() => import(`./challenges`));
const Home = lazy(() => import(`./home`));
const Scoreboard = lazy(() => import(`./scoreboard`));
const Rules = lazy(() => import(`./rules`));
const TeamOverview = lazy(() => import(`./teamOverview`));
const NotFound = lazy(() => import(`./notFound`));

const AnimatedRouter = ({ children }) => {
    // eslint-disable-next-line
    const location = useLocation();
    return (
        <AnimatePresence>
            <Router>
                {children}
            </Router>
        </AnimatePresence>
    );
};

const Play = () => {
    const { isAuthorized, team } = useAuth();

    if (!isAuthorized) {
        return <Redirect to="/auth" noThrow />;
    }

    if (!team) {
        return <Redirect to="/join" noThrow />;
    }

    return (
        <PlayLayout>
            <Suspense fallback={<PageLoader />}>
                <AnimatedRouter>
                    <Redirect from="/" to="home" noThrow />
                    <Home path="home" />
                    <Challenges path="challenges/*challengeId" />
                    <Scoreboard path="scoreboard" />
                    <TeamOverview path="teams/:teamId" />
                    <Rules path="rules" />
                    <NotFound default />
                </AnimatedRouter>
            </Suspense>
        </PlayLayout>
    );
};

export default Play;
