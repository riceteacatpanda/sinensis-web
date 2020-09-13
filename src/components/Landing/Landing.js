import React from "react";

import landing from "./landing.jpg";
import { ReactComponent as Name } from "./rtcp.svg";
import "./Landing.scss";

const Landing = () => (
    <div className="landing">
        <div className="landing__duotone">
            <img className="landing__panda" src={landing} alt="Panda"/>
        </div>
        <div className="landing__name">
            <Name/>
        </div>
    </div>
);

export default Landing;
