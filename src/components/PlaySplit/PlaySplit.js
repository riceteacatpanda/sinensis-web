import React from "react";
import { AnimatePresence } from 'framer-motion';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';
import PlaySidebar from '../PlaySidebar/PlaySidebar';
import PageError from '../PageError/PageError';

import "./PlaySplit.scss";

const PlaySplit = ({ primaryScreen, sidebar }) => (
    <div className="play-split">
        {primaryScreen}
        <AnimatePresence>
            <ErrorBoundry fallback={() => (
                <PlaySidebar>
                    <PageError/>
                </PlaySidebar>
            )}>
                {sidebar}
            </ErrorBoundry>
        </AnimatePresence>
    </div>
);

export default PlaySplit;
