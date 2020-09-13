import React from 'react';
import { Redirect } from "@reach/router";

import { useAuth } from "../context/auth";

const Login = () => {
    const { isAuthorized, team } = useAuth();

    if (!isAuthorized) {
        return <Redirect to="/auth" noThrow />;
    } else if (team) {
        return <Redirect to="/play" noThrow />;
    }

    return (
        <div>
            team join flow wip.
        </div>
    );
};

export default Login;
