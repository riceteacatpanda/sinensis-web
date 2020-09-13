import React from "react";

// osint
import { ReactComponent as Web } from "../svg/web.svg";
import { ReactComponent as Fingerprint } from "../svg/fingerprint.svg";
import { ReactComponent as Lock } from "../svg/lock.svg";
import { ReactComponent as Search } from "../svg/search.svg";
import { ReactComponent as Think } from "../svg/think.svg";
import { ReactComponent as Gear } from "../svg/gear.svg";

export function getCategoryName(name) {
    return {
        web: 'Web',
        forensics: 'Forensics',
        crypto: 'Crypto',
        osint: 'OSInt',
        ai: 'AI',
        reverseEngineering: 'Rev. Eng.',
    }[name];
}

export function getCategoryIcon(name) {
    return {
        web: <Web />,
        forensics: <Fingerprint />,
        crypto: <Lock />,
        osint: <Search />,
        ai: <Think />,
        reverseEngineering: <Gear />,
    }[name];
}
