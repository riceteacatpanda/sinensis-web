import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';

import { getCurrentUser } from "../api/user";
import { useAPI } from "../api/API";
import { getTeam } from "../api/team";
import * as sentryConfig from '../config/sentry';
import { configureScope } from '@sentry/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [team, setTeam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { api } = useAPI();

    const loadUser = useCallback(async () => {
        setIsLoading(true);
        const user = await getCurrentUser(api);

        if (user) {
            // temporary teamId fake.
            user.teamId = "test";
            setUser(user);

            if (user.teamId) {
                const team = await getTeam(api, { id: user.teamId });
                setTeam(team);
            } else {
                setTeam(null);
            }
        } else {
            setUser(null);
            setTeam(null);
        }

        setIsLoading(false);
    }, [api]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    useEffect(() => {
        if (isLoading) return;
        if (sentryConfig.isEnabled && !sentryConfig.isAnon) {
            if (user) {
                configureScope((scope) => {
                    scope.setUser({
                        id: user.id,
                        username: user.username,
                        email: user.email
                    });
                });
            } else {
                configureScope((scope) => {
                    scope.setUser({});
                })
            }
        }
    }, [isLoading, user]);

    return (
        <AuthContext.Provider value={{
            isAuthorized: !!user,
            user,
            setUser,
            team,
            setTeam,
            loadUser,
            isLoading,
            setIsLoading
        }}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
