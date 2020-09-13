import React, { memo, lazy, Suspense } from 'react';
import { Router } from "@reach/router";

import { AuthProvider, useAuth } from "./context/auth";
import { CTFProvider, useCTF } from "./context/ctf";
import { ThemeProvider } from "./context/theme";
import { NotificationProvider } from "./context/notification";
import PageLoader from "./components/PageLoader/PageLoader";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundry";

const Index = lazy(() => import(`./pages/index`));
const Play = lazy(() => import(`./pages/play`));
const Auth = lazy(() => import(`./pages/auth`));
const Join = lazy(() => import(`./pages/join`));

const AppRouter = memo(() => {
    const { isLoading: authIsLoading } = useAuth();
    const { isLoading: ctfIsLoading } = useCTF();

    if (ctfIsLoading || authIsLoading) {
        return <PageLoader />;
    }

    return (
        <Router>
            <Index path="/"/>
            <Play path="/play/*"/>
            <Auth path="/auth/*"/>
            <Join path="/join"/>
        </Router>
    );
});

function App() {
    return (
        <ErrorBoundry>
            <NotificationProvider>
                <Suspense fallback={<PageLoader />}>
                    <ThemeProvider>
                        <AuthProvider>
                            <CTFProvider>
                                <AppRouter />
                            </CTFProvider>
                        </AuthProvider>
                    </ThemeProvider>
                </Suspense>
            </NotificationProvider>
        </ErrorBoundry>
    );
}

export default App;
