import React from "react";
import PageError from "../PageError/PageError";
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';

import "./ErrorBoundry.scss";

const ErrorBoundry = ({
    fallback,
    showDialog = true,
    children = null
}) => {
    return (
        <SentryErrorBoundary fallback={fallback || <PageError />} showDialog={showDialog}>
            {children}
        </SentryErrorBoundary>
    )
};

export default ErrorBoundry;
