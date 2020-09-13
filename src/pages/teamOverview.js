import React, { useState, useEffect } from 'react';

import { getTeam } from "../api/team";
import { useAPI } from "../api/API";
import PlayScreen from "../components/PlayScreen/PlayScreen";
import PageLoader from "../components/PageLoader/PageLoader";
import ProgressCard from "../components/ProgressCard/ProgressCard";
import TeamCard from "../components/TeamCard/TeamCard";
import Dashboard from "../components/Dashboard/Dashboard";

import { ReactComponent as ChartIcon } from "../svg/chart.svg";
import { ReactComponent as TeamIcon } from "../svg/team.svg";

const TeamOverview = ({ teamId }) => {
    const [team, setTeam] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { api, cancel } = useAPI();

    useEffect(() => {
        getTeam(api, { id: teamId })
            .then(team => {
                setTeam(team);
                setIsLoaded(true);
            });

        return () => {
            cancel();
        };
    }, [teamId, api, cancel]);

    if (!isLoaded) {
        return <PageLoader />;
    }

    return (
        <PlayScreen title={team.name} returnButton>
            <Dashboard>
                <Dashboard.Node
                    icon={<ChartIcon/>}
                    title="Progress Overview"
                    wide tall>
                    <ProgressCard team={team} />
                </Dashboard.Node>

                <Dashboard.Node
                    icon={<TeamIcon/>}
                    title="Team Members"
                    tall>
                    <TeamCard team={team} />
                </Dashboard.Node>
                {/* <Dashboard.Node
                    icon={<SolvesIcon/>}
                    title="Recent Solves"
                    full>
                    <SolveList team={team} />
                </Dashboard.Node> */}
            </Dashboard>
        </PlayScreen>
    );
};

export default TeamOverview;
