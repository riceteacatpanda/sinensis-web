import React, { memo } from "react";
import { Flipped } from 'react-flip-toolkit';
import cx from "classnames";

import NavLink from "../NavLink";
import DifficultyRating from "../DifficultyRating/DifficultyRating";
import Card from "../Card/Card";

import { trim } from "../../utils/string";
import { ReactComponent as SolveIcon } from "../../svg/solved.svg";
import "./ChallengeCard.scss";

const ChallengeCard = ({
    challenge,
    ...props
}) => {
    const {
        id,
        name,
        difficulty,
        description,
        points,
        youSolved: isSolved
    } = challenge;

    return (
        <NavLink
            to={`/play/challenges/${id}`}
            className={cx("challenge-card", {
                "challenge-card__solved": isSolved
            })}
            activeClassName="challenge-card__selected"
            {...props}>
            <Card shadow={isSolved ? 'small' : 'regular'} active>
                <Flipped inverseFlipId={challenge.id} scale>
                    {flippedProps => (
                        <div {...flippedProps}>
                            <Card.Section>
                                <div className="challenge-card__header">
                                    <div className="challenge-card__header__item--main">
                                        <div className="challenge-card__title">
                                            <h3 className="challenge-card__name">
                                                {isSolved && (
                                                    <SolveIcon />
                                                )}{name}
                                            </h3>
                                        </div>
                                        <div className="challenge-card__labels">
                                            <DifficultyRating rating={difficulty}/>
                                        </div>
                                    </div>
                                    <div className="challenge-card__header__item">
                                        <span className="challenge-card__points">{points.toLocaleString()}</span>
                                        <span className="challenge-card__points-label"> points</span>
                                    </div>
                                </div>
                            </Card.Section>
                            <Card.Section>
                                <p className="challenge-card__description">{trim(description, 30)}</p>
                            </Card.Section>
                        </div>
                    )}
                </Flipped>
            </Card>
        </NavLink>
    );
};

export default memo(ChallengeCard);
