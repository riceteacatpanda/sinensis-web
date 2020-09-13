import React, { useState, useEffect, useCallback } from 'react';

import { getScoreboard } from "../api/scoreboard";
import { useAPI } from "../api/API";
import ScoreboardScreen from "../components/ScoreboardScreen/ScoreboardScreen";
import Search from "../components/Search/Search";
import Scoreboard from "../components/Scoreboard/Scoreboard";
import PageLoader from "../components/PageLoader/PageLoader";

const ScoreboardPage = () => {
    const [scores, setScores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const { api } = useAPI();

    const search = useCallback((query) => {
        setFilter(query);
    }, []);

    useEffect(() => {
        getScoreboard(api)
            .then(scoreboard => {
                const scores = scoreboard
                    .scores
                    .map((score, index) => ({ rank: index + 1, ...score }));
                setScores(scores);
                setIsLoading(false);
            });
    }, [api]);

    return (
        <ScoreboardScreen title="Scoreboard">
            {isLoading ? (
                <PageLoader />
            ) : (
                <>
                    <Search onChange={search} />
                    <Scoreboard scores={scores} filter={filter} />
                </>
            )}
        </ScoreboardScreen>
    );
};

export default ScoreboardPage;
