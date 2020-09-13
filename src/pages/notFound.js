import React from 'react';

import ErrorSplash from "../components/ErrorSplash/ErrorSplash";
import ArrowLink from "../components/ArrowLink/ArrowLink";
import { ReactComponent as NotFoundImage } from "../svg/404.svg";

const NotFound = () => {
    return (
        <ErrorSplash
            icon={<NotFoundImage />}
            title="That page couldn't be found 😔"
            returnLink={
                <ArrowLink to="/play/home">
                    Return home
                </ArrowLink>
            }>
            <p>
                We encountered a 404 looking for that page. Make sure the URL is
                correct and that the page you're looking for does indeed exist.
            </p>
        </ErrorSplash>
    );
};

export default NotFound;
