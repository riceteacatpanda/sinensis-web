import React, { memo, useMemo, useState } from "react";
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useLocation } from '@reach/router';
import xor from 'lodash/xor';
import { Searcher } from 'fast-fuzzy';
// import { motion } from 'framer-motion';

import "./ChallengeGrid.scss";

import ChallengeCard from "../ChallengeCard/ChallengeCard";
import Button from "../Button/Button";
import CardGrid from "../CardGrid/CardGrid";
import UtilityBar from "../UtilityBar/UtilityBar";
import Search from "../Search/Search";

import { ReactComponent as FilterIcon } from "../../svg/funnel.svg";
import { ReactComponent as SearchIcon } from "../../svg/search.svg";

// import { ReactComponent as SortIcon } from "../../svg/sort.svg";
// import { ReactComponent as PlusIcon } from "../../svg/plus.svg";
// import { ReactComponent as ImportIcon } from "../../svg/import.svg";
// import { ReactComponent as AdminPanelIcon } from "../../svg/admin-panel.svg";

import { getCategoryName, getCategoryIcon } from "../../utils/category";
import { countBy } from "../../utils/array";

const ChallengeCardGrid = memo(({ challenges }) => {
    return (
        <CardGrid>
            {challenges.map(challenge => (
                <Flipped flipId={challenge.id} key={challenge.id}>
                    {flippedProps => (
                        <ChallengeCard challenge={challenge} {...flippedProps} />
                    )}
                </Flipped>
            ))}
        </CardGrid>
    );
});

const ChallengeGrid = ({ challenges }) => {
    const location = useLocation();

    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState("");
    const categories = useMemo(() => countBy(challenges, c => c.category), [challenges]);

    const filteredChallenges = useMemo(
        () => challenges.filter((c) => !filters.length || filters.includes(c.category)),
    [challenges, filters]);

    const searcher = useMemo(() => (
        new Searcher(filteredChallenges, {
            keySelector: c => [c.name, c.description]
        })
    ), [filteredChallenges]);

    const challengesToDisplay = useMemo(() => {
        if (!search) {
            return filteredChallenges;
        } else {
            return searcher.search(search);
        }
    }, [search, filteredChallenges, searcher]);

    return (
        <div>
            <UtilityBar>
                <UtilityBar.Item
                    icon={<FilterIcon />}
                    name="Filter Category">
                    {categories.map(([category, count]) => (
                        <Button
                            onClick={() => setFilters(xor(filters, [category]))}
                            selected={filters.includes(category)}
                            // count={count}
                            icon={getCategoryIcon(category)}
                            key={category}
                            design="toggle">
                            {getCategoryName(category)}
                        </Button>
                    ))}
                </UtilityBar.Item>
                {/* <UtilityBar.Item
                    isAside
                    icon={<SortIcon />}
                    name="Sort">
                    <Search
                        placeholder="Challenge Name..."
                        onChange={query => setSearch(query)} />
                </UtilityBar.Item> */}
            </UtilityBar>
            <UtilityBar>
                <UtilityBar.Item
                    icon={<SearchIcon />}
                    name="Search">
                    <Search
                        placeholder="Challenge Name..."
                        onChange={query => setSearch(query)} />
                </UtilityBar.Item>
            </UtilityBar>
            <Flipper flipKey={`${filters};${search};${location.key}`}>
                <ChallengeCardGrid challenges={challengesToDisplay}/>
            </Flipper>
        </div>
    )
};

export default ChallengeGrid;
