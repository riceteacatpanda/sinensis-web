import React, { lazy, Suspense } from 'react';
import { Router, Redirect } from "@reach/router";

import { useAuth } from "../context/auth";

import AuthSplit from "../components/AuthSplit/AuthSplit";
import PageLoader from "../components/PageLoader/PageLoader";

const Login = lazy(() => import(`./login`));
const Register = lazy(() => import(`./register`));
const NotFound = lazy(() => import(`./notFound`));
const ForgotPassword = lazy(() => import(`./forgotPassword`));

const Auth = () => {
    const { isAuthorized } = useAuth();

    if (isAuthorized) {
        return <Redirect to="/play" noThrow />;
    }

    return (
        <AuthSplit>
            <Suspense fallback={<PageLoader />}>
                <Router>
                    <Redirect from="/" to="login" noThrow />
                    <Login path="login" />
                    <Register path="register" />
                    <ForgotPassword path="forget" />
                    <NotFound default />
                </Router>
            </Suspense>
        </AuthSplit>
    );
};

export default Auth;
