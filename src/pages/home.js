import React from 'react';

import { useAuth } from '../context/auth';

import PlayScreen from "../components/PlayScreen/PlayScreen";
import Greeting from "../components/Greeting/Greeting";
import ProgressCard from "../components/ProgressCard/ProgressCard";
import TeamCard from "../components/TeamCard/TeamCard";
import Dashboard from "../components/Dashboard/Dashboard";
// eslint-disable-next-line
import SolveList from "../components/SolveList/SolveList";

import { ReactComponent as ChartIcon } from "../svg/chart.svg";
import { ReactComponent as TeamIcon } from "../svg/team.svg";
// eslint-disable-next-line
import { ReactComponent as SolvesIcon } from "../svg/solves.svg";

const Home = () => {
    const { user, team } = useAuth();

    return (
        <PlayScreen title={<Greeting user={user} />}>
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

export default Home;
