import React, { memo, useCallback, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { motion } from "framer-motion";

import GoBack from "../GoBack/GoBack";
import AdminPanel from "../AdminPanel/AdminPanel";
import PlaySidebar from "../PlaySidebar/PlaySidebar";
import Button from "../Button/Button";
import PageLoader from "../PageLoader/PageLoader";
import FlagSubmit from "../FlagSubmit/FlagSubmit";
import DifficultyRating from "../DifficultyRating/DifficultyRating";
// eslint-disable-next-line
import SolveTable from "../SolveTable/SolveTable";
import InputGroup from "../InputGroup/InputGroup";

import { useAPI } from "../../api/API";
import { getChallengeForId, deleteChallengeForId } from "../../api/challenges";
import { useAuth } from "../../context/auth";

import { ReactComponent as Trash } from "../../svg/trash.svg";
import { ReactComponent as Edit } from "../../svg/edit.svg";
import { ReactComponent as Save } from "../../svg/save.svg";
import { ReactComponent as Check } from "../../svg/check.svg";
import { ReactComponent as User } from "../../svg/user.svg";

import "./ChallengeSidebar.scss";

const ChallengeDataGrid = ({ children }) => (
    <div className="cs-data-grid">
        {children}
    </div>
);

ChallengeDataGrid.Item = ({ icon, name, value }) => (
    <div className="cs-data-grid__item">
        <div className="cs-data-grid__icon">{icon}</div>
        <div className="cs-data-grid__content">
            <div className="cs-data-grid__name">{name}</div>
            <div className="cs-data-grid__value">{value}</div>
        </div>
    </div>
);

const ChallengeDetails = memo(({ challenge }) => {
    return (
        <div className="challenge-sidebar__details">
            <div className="challenge-sidebar__details__pair">
                <div className="challenge-sidebar__details__pair__primary">
                    <h2 className="challenge-sidebar__name">{challenge.name}</h2>
                    <div className="challenge-sidebar__labels">
                        <DifficultyRating rating={challenge.difficulty} />
                    </div>
                </div>
                <div className="challenge-sidebar__details__pair__aside">
                    <div className="challenge-sidebar__points">{challenge.points.toLocaleString()}</div>
                    <div className="challenge-sidebar__points-label">points</div>
                </div>
            </div>
            <p className="challenge-sidebar__description">{challenge.description}</p>
            <ChallengeDataGrid>
                <ChallengeDataGrid.Item
                    icon={<User />}
                    name="Authored by"
                    value={challenge.author}
                    />
                <ChallengeDataGrid.Item
                    icon={<Check />}
                    name="Solved"
                    value={`${Math.random() * 100|0} times`}
                    />
            </ChallengeDataGrid>
        </div>
    );
});

const ChallengeSidebarContent = ({ challenge }) => {
    const [isSolved, setIsSolved] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    // eslint-disable-next-line
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);

    const { api } = useAPI();
    const { user } = useAuth();

    const deleteChallenge = () => {
        if (window.confirm(`Confirm to DELETE challenge "${challenge.name}"?`)) {
            deleteChallengeForId(api, { id: challenge.id })
                .then(() => {
                    navigate('/play/challenges');
                });
        }
    };

    const beginEdit = () => {
        setIsEditing(true);
    };

    const saveEdit = () => {
        setIsLoadingEdit(true);
        setIsEditing(false);
    };

    const solve = useCallback(() => setIsSolved(true), []);

    return (
        <div className="challenge-sidebar">
            {user.isAdmin && (
                <AdminPanel className="challenge-sidebar__admin-panel">
                        <motion.div layout>
                            {
                                isEditing ? (
                                    <Button
                                        onClick={saveEdit}
                                        icon={<Save />}
                                        color="green"
                                        // key="save"
                                        design="small">
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={beginEdit}
                                        icon={<Edit />}
                                        // key="edit"
                                        design="small">
                                        Edit
                                    </Button>
                                )
                            }
                        </motion.div>
                        <motion.div layout>
                            <Button
                                onClick={deleteChallenge}
                                icon={<Trash />}
                                design="small"
                                color="red">
                                Delete
                            </Button>
                        </motion.div>
                </AdminPanel>
            )}

            <ChallengeDetails challenge={challenge} />
            <InputGroup label="Submit Flag">
                <FlagSubmit
                    challengeId={challenge.id}
                    isSolved={isSolved}
                    onSolve={solve} />
            </InputGroup>
            {/* <SolveTable solves={challenge.solves} /> */}
        </div>
    );
};

const ChallengeSidebar = ({ challengeId }) => {
    const [challenge, setChallenge] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { api } = useAPI();

    // Corectly load and validate challenges
    useEffect(() => {
        // Ensure challengeId only only has valid characters
        if (!/^[a-z0-9-]+$/.test(challengeId)) {
            navigate(`/play/challenges`);
            return;
        } else {
            setIsLoading(true);
        }
    }, [challengeId]);

    // Handle [esc] to close out sidebar
    useEffect(() => {
        function closeSidebar(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                navigate(`/play/challenges`);
            }
        }

        document.addEventListener("keydown", closeSidebar, false);
        return () => {
            document.removeEventListener("keydown", closeSidebar, false);
        };
    }, []);

    // Load challenge content from server
    useEffect(() => {
        if (isLoading) {
            getChallengeForId(api, { id: challengeId })
                .then((challenge) => {
                    setChallenge(challenge);
                    setIsLoading(false);
                });
        }
    }, [api, challengeId, isLoading]);

    if (isLoading) {
        return (
            <PlaySidebar>
                <PageLoader />
            </PlaySidebar>
        );
    }

    return (
        <PlaySidebar>
            <GoBack text="× Close" target="/play/challenges" />
            {isLoading ? <PageLoader /> : <ChallengeSidebarContent challenge={challenge}/>}
        </PlaySidebar>
    );
};

export default memo(ChallengeSidebar);
