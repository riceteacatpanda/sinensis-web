import React, { useState } from 'react';
import { Link } from "@reach/router";

import { ReactComponent as AtSignIcon } from "../svg/atsign.svg";

import { forgotPassword } from "../api/user";
import { useAPI } from "../api/API";

import Button from "../components/Button/Button";
import AuthScreen from "../components/AuthScreen/AuthScreen";
import BorderInput from "../components/BorderInput/BorderInput";

const ForgotPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [email, setEmail] = useState("");

    const { api } = useAPI();

    const submitForm = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        forgotPassword(api, { email })
            .then(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <AuthScreen
            title="Forgot Password"
            subtitle={(
                <>Don't need to reset your password? <Link to="/auth/login">Log in.</Link></>
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
                <Button.Group>
                    <Button
                        isDisabled={isSubmitting}
                        isLoading={isSubmitting}
                        type="submit">Send Recovery Email</Button>
                </Button.Group>
            </form>
        </AuthScreen>
    );
};

export default ForgotPassword;
