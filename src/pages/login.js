import React, { useState } from 'react';
import { Link, navigate } from "@reach/router";

import { ReactComponent as PasswordIcon } from "../svg/password.svg";
import { ReactComponent as AtSignIcon } from "../svg/atsign.svg";

import { login } from "../api/user";
import { useAPI } from "../api/API";
import { useAuth } from "../context/auth";

import AuthScreen from "../components/AuthScreen/AuthScreen";
import Button from "../components/Button/Button";
import BorderInput from "../components/BorderInput/BorderInput";

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // eslint-disable-next-line
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

    const { loadUser } = useAuth();
    const { api } = useAPI({
        cancelPending: true,
        cancelOnUnmount: false
    });

    const submitForm = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        async function doLogin() {
            // eslint-disable-next-line
            const { success, invalidKeys } = await login(api, { email, password });
            if (success) {
                setIsInvalidCredentials(false);

                // Get new user information
                navigate('/play');
                await loadUser();
            } else {
                setIsSubmitting(false);
                setIsInvalidCredentials(true);
            }
        }

        doLogin();
    };

    return (
        <AuthScreen
            title="Sign In."
            subtitle={(
                <>Don't have an account? <Link to="/auth/register">Register a new account!</Link></>
            )}>
            <form onSubmit={submitForm}>
                <BorderInput
                    isDisabled={isSubmitting}
                    value={email}
                    onChange={setEmail}
                    icon={<AtSignIcon />}
                    label="Email"
                    type="email"
                    title="Enter your email."
                    id="auth-email"
                    placeholder="shoob@gmail.com" />
                <BorderInput
                    isDisabled={isSubmitting}
                    value={password}
                    onChange={setPassword}
                    icon={<PasswordIcon />}
                    label="Password"
                    type="password"
                    title="Enter your password."
                    id="auth-password"
                    placeholder="hunter2" />
                <Button.Group>
                    <Button
                        isDisabled={isSubmitting}
                        isLoading={isSubmitting}
                        type="submit">Sign In</Button>
                    <Button
                        onClick={() => navigate('/auth/forget')}
                        design="plain">Forgot Password</Button>
                </Button.Group>
            </form>
        </AuthScreen>
    );
};

export default Login;
