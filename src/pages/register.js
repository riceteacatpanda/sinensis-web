import React, { useState } from 'react';
import { Link, navigate } from "@reach/router";

import { ReactComponent as PasswordIcon } from "../svg/password.svg";
import { ReactComponent as UserIcon } from "../svg/user.svg";
import { ReactComponent as AtSignIcon } from "../svg/atsign.svg";

import { register } from "../api/user";
import { useAPI } from "../api/API";

import Button from "../components/Button/Button";
import AuthScreen from "../components/AuthScreen/AuthScreen";
import BorderInput from "../components/BorderInput/BorderInput";

const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { api } = useAPI();

    const submitForm = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        register(api, { email, username, password })
            .then(() => {
                setIsSubmitting(false);
                navigate('/play');
            });
    };

    return (
        <AuthScreen
            title="Register"
            subtitle={(
                <>Already have an account? <Link to="/auth/login">Log in.</Link></>
            )}>
            <form onSubmit={submitForm}>
                <BorderInput
                    isDisabled={isSubmitting}
                    value={username}
                    onChange={setUsername}
                    icon={<UserIcon />}
                    label="Username"
                    title="Enter your username."
                    id="auth-username"
                    placeholder="AzureDiamond" />
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
                        type="submit">Register</Button>
                </Button.Group>
            </form>
        </AuthScreen>
    );
};

export default Register;
