import React, { memo, useState, useEffect } from 'react';

import PlayScreen from "../components/PlayScreen/PlayScreen";
import PlaySplit from "../components/PlaySplit/PlaySplit";
import ChallengeGrid from "../components/ChallengeGrid/ChallengeGrid";
import PageLoader from "../components/PageLoader/PageLoader";
import ChallengeSidebar from "../components/ChallengeSidebar/ChallengeSidebar";

import { getChallenges } from "../api/challenges";
import { useAPI } from "../api/API";

const ChallengesScreen = memo(() => {
    const [isLoading, setIsLoading] = useState(true);
    const [challenges, setChallenges] = useState([]);
    const { api } = useAPI();

    useEffect(() => {
        getChallenges(api)
            .then(challenges => {
                setChallenges(challenges);
                setIsLoading(false);
            });
    }, [api]);

    return (
        <PlayScreen title="Challenges">
            {isLoading ? <PageLoader /> : (
                <ChallengeGrid challenges={challenges}/>
            )}
        </PlayScreen>
    );
});


const Challenges = ({
    challengeId
}) => {
    return (
        <PlaySplit
            primaryScreen={<ChallengesScreen />}
            sidebar={challengeId && <ChallengeSidebar challengeId={challengeId} />}/>
    )
};

export default Challenges;
