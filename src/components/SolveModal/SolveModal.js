import React, { useState, useEffect, useRef, useCallback } from "react";
import confetti from 'canvas-confetti';
import random from 'lodash/random';
import sample from 'lodash/sample';

import { useQueuedState, useTimeout, useInterval } from "../../utils/hooks";
import Modal from "../Modal/Modal";
import { ReactComponent as ReplayIcon } from "../../svg/replay.svg";

import gif1 from "./shoob1.gif";

import "./SolveModal.scss";

const gifs = [
    gif1
];

const confettiOptions = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    particleCount: 80
};

const decayRate = 0.8;

const SolveModal = ({ isOpen, ...props }) => {
    const interval = useInterval();
    const timeout = useTimeout();
    const gif = useRef(sample(gifs));

    const [hasPlayedConfetti, setHasPlayedConfetti] = useState(false);
    const [showReplay, setShowReplay] = useQueuedState(false);

    const playConfetti = useCallback(() => {
        let particleCount = confettiOptions.particleCount;
        const stop = interval(() => {
            confetti({
                ...confettiOptions,
                particleCount,
                origin: {
                    x: random(0.1, 0.4, true),
                    y: Math.random() - 0.2
                }
            });

            confetti({
                ...confettiOptions,
                particleCount,
                origin: {
                    x: random(0.6, 0.9, true),
                    y: Math.random() - 0.2
                }
            });

            particleCount *= decayRate;
        }, 300);

        timeout(stop, 2500);
        setShowReplay(false, true, 2500);
    }, [interval, timeout, setShowReplay]);

    useEffect(() => {
        if (isOpen && !hasPlayedConfetti) {
            // Show confetti
            playConfetti();
            setHasPlayedConfetti(true);
        }
        // eslint-disable-next-line
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} {...props}>
            <h1>Nice Job! <span role="img" aria-label="celebration">🎉</span></h1>
            <img className="solve-modal__image" src={gif.current} alt="A fluffy friend is proud of you!"/>
            <div className="solve-modal__replay">
                <button
                    className="replay-confetti"
                    onClick={playConfetti}
                    disabled={!showReplay}>
                    <ReplayIcon />
                    <span>Replay Confetti</span>
                </button>
            </div>
            <p>
                You just solved your first challenge! Keep on going... this is
                your start of a great journey.
            </p>
        </Modal>
    );
};

export default SolveModal;
