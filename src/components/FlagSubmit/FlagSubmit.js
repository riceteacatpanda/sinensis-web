import React, { memo, useState, useCallback } from "react";
import { useQueuedState, useTimeout } from "../../utils/hooks";
import cx from "classnames";

import SolveModal from "../SolveModal/SolveModal";

import { useAPI } from "../../api/API";
import { submitChallenge } from "../../api/challenges";
import { ReactComponent as RightArrow } from "../../svg/rightArrow.svg";
import { ReactComponent as Spinner } from "../../svg/spinner.svg";
import { ReactComponent as Check } from "../../svg/check.svg";
import { ReactComponent as Cross } from "../../svg/cross.svg";
import * as ctf from "../../config/ctf";
import "./FlagSubmit.scss";


const FlagSubmit = ({ challengeId, isSolved, onSolve = null }) => {
    const [flag, setFlag] = useState("");

    const [inputState, updateInputState] = useQueuedState('ready');
    const [canShowSpinner, setCanShowSpinner] = useState(false);
    const [isShaking, updateIsShaking] = useQueuedState(false);
    const [isDisplayingModal, setIsDisplayingModal] = useState(false);

    const timeout = useTimeout();
    const { api } = useAPI();

    const hideModal = useCallback(() => setIsDisplayingModal(false), []);

    const submitFlag = (e) => {
        e.preventDefault();
        updateInputState('loading', () => setCanShowSpinner(true), 80);

        submitChallenge(api, {
            challengeId: challengeId,
            flag
        }).then(({ isCorrect }) => {
            if (isCorrect) {
                updateInputState('correct', 'ready', 1200);
                if (onSolve) {
                    onSolve(challengeId);
                }
                timeout(() => {
                    setIsDisplayingModal(true);
                }, 500);
            } else {
                updateInputState('incorrect', 'ready', 1200);
                updateIsShaking(true, false, 350);
            }
            setCanShowSpinner(false);
        });
    };

    const isDisabled = ['loading'].includes(inputState);
    return (
        <>
            <form
                onSubmit={submitFlag}
                className={cx("flag-submit", {
                    "flag-submit--focused": inputState === 'focused',
                    "flag-submit--disabled": isDisabled,
                    "flag-submit--correct": inputState === 'correct',
                    "flag-submit--incorrect": inputState === 'incorrect',
                    "flag-submit--shake shake-constant": isShaking
                })}>
                <input
                    disabled={isDisabled}
                    title="Enter the flag."
                    type="text"
                    placeholder={ctf.flagFormat}
                    onFocus={e => updateInputState('focused')}
                    onBlur={e => updateInputState('ready')}
                    onChange={e => setFlag(e.target.value)}
                    value={flag} />
                <button type="submit" disabled={isDisabled}>
                    {
                        inputState === 'loading' && canShowSpinner ?
                            <Spinner title="Submitting Flag..."/> :
                            {
                                'correct': <Check />,
                                'incorrect': <Cross />
                            }[inputState] || <RightArrow title="Submit Flag"/>
                    }
                </button>
            </form>
            <SolveModal
                isOpen={isDisplayingModal}
                onRequestClose={hideModal} />
        </>
    )
};

export default memo(FlagSubmit);
